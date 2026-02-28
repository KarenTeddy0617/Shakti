import nodemailer from "nodemailer";

export async function POST(req) {
  const { recipientEmail, subject, text, pdfBuffer, pdfName } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      text,
      attachments: [
        {
          filename: pdfName || "document.pdf",
          content: Buffer.from(pdfBuffer, "base64"),
          contentType: "application/pdf",
        },
      ],
    });

    return new Response(JSON.stringify({ message: "Email sent!" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error sending email", error }), { status: 500 });
  }
}