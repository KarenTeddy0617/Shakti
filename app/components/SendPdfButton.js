"use client";

import React from "react";
import axios from "axios";

export default function SendPdfButton({ pdfBlob }) {
  const sendEmail = async () => {
    if (!pdfBlob) return alert("No PDF available!");

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];
      try {
        await axios.post("/api/send-email", {
          recipientEmail: "example@example.com",
          subject: "Your PDF Document",
          text: "Here is your PDF",
          pdfBuffer: base64data,
          pdfName: "certificate.pdf",
        });
        alert("Email sent!");
      } catch (error) {
        console.error(error);
        alert("Error sending email");
      }
    };
  };

  return (
    <button
      onClick={sendEmail}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Send PDF via Email
    </button>
  );
}