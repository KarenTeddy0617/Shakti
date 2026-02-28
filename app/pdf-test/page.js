"use client";
import { useState, useEffect } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { supabase } from "@/lib/supabaseClient";

export default function PdfTest() {
  const [entries, setEntries] = useState([]);
  const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";

  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .order("created_at", { ascending: false });

      if (!error) setEntries(data);
    }
    fetchEntries();
  }, []);}

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const fontSize = 14;
    const lineHeight = 20; // spacing between lines
    const maxWidth = 500; // wrap text within this width
    let y = 750;
    let page = pdfDoc.addPage([600, 800]);

    page.drawText("Secure Vault PDF Report", {
      x: 50,
      y,
      size: 20,
      font: timesRomanFont,
      color: rgb(1, 0, 0),
    });
    y -= 40;

    /*for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      */
     const drawWrappedText = (text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth > maxWidth) {
        page.drawText(line, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
        line = words[i] + " ";
        y -= lineHeight;
      } else {
        line = testLine;
      }
    }
    /*

      // If page is full, add a new page first
      if (y < 100) {
        page = pdfDoc.addPage([600, 800]);
        y = 750;
      }

      // Draw note text
      page.drawText(`Note #${i + 1}: ${e.note}`, {
        x: 50,
        y,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
        maxWidth: 500,
      });
      y -= 30;

      // Draw image URL
      if (e.image_url) {
        page.drawText(`Image: ${e.image_url}`, {
          x: 50,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 1),
          maxWidth: 500,
        });
        y -= 20;
      }

      // Draw audio URL
      if (e.audio_url) {
        page.drawText(`Audio: ${e.audio_url}`, {
          x: 50,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 1),
          maxWidth: 500,
        });
        y -= 20;
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "VaultReport.pdf";
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PDF Test - Vault Export</h1>
      <button
        onClick={generatePdf}
        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white" }}
      >
        Generate PDF of Vault
      </button>
    </div>
  );
}*/

 page.drawText(line, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
    return y - lineHeight; // return new y after drawing
  };

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];

    // Draw note text with wrapping
    y = drawWrappedText(`Note #${i + 1}: ${e.note}`, 50, y, maxWidth, lineHeight);

    // Draw image link
    if (e.image_url) {
      y -= 5; // small spacing
      y = drawWrappedText(`Image: ${e.image_url}`, 50, y, maxWidth, lineHeight);
    }

    // Draw audio link
    if (e.audio_url) {
      y -= 5;
      y = drawWrappedText(`Audio: ${e.audio_url}`, 50, y, maxWidth, lineHeight);
    }

    // Add new page if we reach bottom
    if (y < 100) {
      page = pdfDoc.addPage([600, 800]);
      y = 750;
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "VaultReport.pdf";
  link.click();
}; 