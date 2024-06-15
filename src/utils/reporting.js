import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import fs from "fs";

export const generateReport = (data) => {
  try {
    const doc = new Document();
    doc.addSection({
      children: [
        new Paragraph({
          text: "Company Analysis Report",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: `Company Name: ${data.name}`,
        }),
        new Paragraph({
          text: `Industry: ${data.industry}`,
        }),
        new Paragraph({
          text: `Stock Price: ${data.stockPrice}`,
        }),
        new Paragraph({
          text: `About Us: ${data.aboutUs}`,
        }),
        new Paragraph({
          text: `Careers: ${data.careers}`,
        }),
        new Paragraph({
          text: `News: ${data.news}`,
        }),
        new Paragraph({
          text: `AI Analysis: ${data.analysis}`,
        }),
        // Add more sections as needed
      ],
    });

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("Company_Analysis_Report.docx", buffer);
    });
  } catch (error) {
    console.error(`Error generating report: ${error}`);
    return 'Error generating report';
  }
};