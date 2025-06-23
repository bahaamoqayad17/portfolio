import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, mobile, subject, message } = await req.json();

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "bahaamoqayad17@gmail.com",
        pass: "qqst wmsq lgfn wzbf",
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email content with improved HTML design
    const mailOptions = {
      from: `"Portfolio Contact Form" <${email}>`,
      to: "bahaamoqayad17@gmail.com", // Send to yourself
      replyTo: email, // Set reply-to as the contact form email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        ">
          <div style="
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
          ">
            <h1 style="
              color: white;
              margin: 0;
              font-size: 24px;
              text-align: center;
            ">New Contact Form Submission</h1>
          </div>

          <div style="
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <div style="margin-bottom: 20px;">
              <h2 style="
                color: #4f46e5;
                margin: 0 0 10px 0;
                font-size: 20px;
              ">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Name:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Email:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Mobile:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <a href="tel:${mobile}" style="color: #4f46e5; text-decoration: none;">${mobile}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Subject:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${subject}
                  </td>
                </tr>
              </table>
            </div>

            <div>
              <h2 style="
                color: #4f46e5;
                margin: 0 0 10px 0;
                font-size: 20px;
              ">Message</h2>
              <div style="
                background-color: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #4f46e5;
              ">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>

          <div style="
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 14px;
          ">
            <p>This email was sent from your portfolio website contact form.</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
