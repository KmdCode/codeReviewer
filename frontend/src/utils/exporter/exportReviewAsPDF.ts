import { ICode } from "@/providers/review-provider/context";
import {message } from 'antd';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportReviewAsPDF = (review: ICode[]) => {
    if (!review || review.length === 0) {
        message.warning("No review results to export.");
        return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Code Review Results", 14, 22);

    const tableData = review.map(item => {
        const line = item.line !== undefined ? item.line : '';
        const message = item.message !== undefined ? item.message : '';
        return [line, message];
    });

    autoTable(doc, {
        startY: 30,
        head: [["Line", "Message"]],
        body: tableData,
    });

    doc.save("csharp-review-results.pdf");
};