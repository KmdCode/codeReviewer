import { Webhooks } from '@octokit/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import { getAiReview } from '@/utils/reviews/ai-review';

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

webhooks.on('pull_request.opened', async ({ payload }) => {
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
    if (file.patch) {
      const review = await getAiReview(file.patch, file.filename);

      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: `🧠 AI Review for \`${file.filename}\`:\n${review}`,
      });
    }
  }
});

export const POST = async(req: NextRequest) => {
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


