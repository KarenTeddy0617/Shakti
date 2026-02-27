// lib/pdf.js
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// entries: [{ note, image_url?, audio_url? }]
export async function generatePdf(entries) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  let page = pdfDoc.addPage([600, 800]);
  let y = 750;

  page.drawText("Secure Vault PDF Report", { x: 50, y, size: 20, font, color: rgb(1, 0, 0) });
  y -= 40;
  const fontSize = 14;

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];

    // Draw note
    page.drawText(`Note #${i + 1}: ${e.note}`, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 0), maxWidth: 500 });
    y -= 30;

    // Draw image URL if exists
    if (e.image_url) {
      page.drawText(`Image: ${e.image_url}`, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 1), maxWidth: 500 });
      y -= 20;
    }

    // Draw audio URL if exists
    if (e.audio_url) {
      page.drawText(`Audio: ${e.audio_url}`, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 1) });
      y -= 20;
    }

    if (y < 100) {
      page = pdfDoc.addPage([600, 800]);
      y = 750;
    }
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}