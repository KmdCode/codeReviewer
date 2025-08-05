import { Webhooks } from '@octokit/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import { getAiReview } from '@/utils/reviews/ai-review';
import { getLanguageFromFilename } from '@/utils/get-language';
import { ICode } from '@/providers/review-provider/context';
import { analyzeCode } from '@/utils/analyzer/staticAnalyzer';
import { axiosInstance } from "@/utils/axiosInstance";

const instance = axiosInstance;

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

webhooks.on(['pull_request.opened', 'pull_request.synchronize'], async ({ payload }) => {
    const { number: prNumber, repository } = payload;
    const owner = repository.owner.login;
    const repo = repository.name;

    const auth = createAppAuth({
        appId: process.env.GITHUB_APP_ID!,
        privateKey: process.env.GITHUB_PRIVATE_KEY!,
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    });

    const installationAuth = await auth({ type: 'installation', installationId: payload.installation!.id });
    const octokit = new Octokit({ auth: installationAuth.token });

    const files = await octokit.pulls.listFiles({ owner, repo, pull_number: prNumber });

    for (const file of files.data) {
    if (!file.patch) continue;

    const language = getLanguageFromFilename(file.filename);

    let review: ICode[] = [];

    try {
        if (language === 'TypeScript' || language === 'TypeScript (React)') {
            review = await analyzeCode(file.patch);
            
        } else if (language === 'c#') {
            const endpoint = '/services/app/StaticAnalyzer/Analyze';
            const response = await instance.post(endpoint, file.patch);
            review = response.data.result;
        }

        const formattedReview = review
            .map((issue) => `- Line ${issue.line}: ${issue.message}`)
            .join('\n');

        if (formattedReview) {
            await octokit.issues.createComment({
                owner,
                repo,
                issue_number: prNumber,
                body: `Boxfusion Best Practices Review for \`${file.filename}\`:\n${formattedReview}`,
            });
        }
    } catch (err) {
        console.error(`Error reviewing ${file.filename}:`, err);
    }

    try {
  
        const aiReview : ICode[] = await getAiReview(file.patch, language);
        const formattedAiReview = aiReview
            .map((issue) => `- Line ${issue.line}: ${issue.message}`)
            .join('\n');

        if (formattedAiReview) {
            await octokit.issues.createComment({
                owner,
                repo,
                issue_number: prNumber,
                body: ` AI Review for \`${file.filename}\`:\n${formattedAiReview}`,
            });
        }
    } catch (err) {
        console.error(`AI review failed for ${file.filename}:`, err);
    }
}

 
});

export const POST = async (req: NextRequest) => {
    const payload = await req.text();
    const signature = req.headers.get('x-hub-signature-256')!;

    try {
        await webhooks.verifyAndReceive({
            id: req.headers.get('x-github-delivery')!,
            name: req.headers.get('x-github-event')!,
            signature,
            payload,
        });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
    }
}
