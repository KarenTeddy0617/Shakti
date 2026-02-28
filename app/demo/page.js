"use client";

import React, { useState } from "react";
import SendPdfButton from "../../components/SendPdfButton";

export default function DemoPage() {
  const [pdfBlob, setPdfBlob] = useState(null);

  const generatePdf = () => {
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.jsPDF();
      doc.text("Hello SHAKTI!", 10, 10);
      const blob = doc.output("blob");
      setPdfBlob(blob);
    });
  };

  return (
    <div className="p-8">
      <button
        onClick={generatePdf}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Generate PDF
      </button>

      {pdfBlob && <SendPdfButton pdfBlob={pdfBlob} />}
    </div>
  );
}