import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // Use SSL if port is 465
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function GET() {
  //   const body = await req.json();
  //   const { to, subject, htmlContent } = body;
  //   console.log("body:", body);

  const to = "kakembohenry5@gmail.com";
  const subject = "Test Email";
  const htmlContent = "<h1>This is a test email</h1>";
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: subject,
      html: htmlContent,
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
