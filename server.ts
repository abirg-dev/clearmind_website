import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Configuration

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/book", async (req, res) => {
    const { name, email, countryCode, phone, message, psychologist } = req.body;
    const fullPhone = countryCode ? `${countryCode} ${phone}` : phone;
    
    console.log("New Appointment Request:", { name, email, phone: fullPhone, message, psychologist });

    // 1. Send Email Notification
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Verify connection configuration
        await transporter.verify();
        console.log("SMTP connection verified successfully.");

        const mailOptions = {
          from: `"Clearmind Counselling" <${process.env.EMAIL_USER}>`,
          to: email,
          cc: process.env.EMAIL_USER,
          subject: `New Therapy Session Request - ${name}`,
          text: `
Hello,

We have received a new therapy session request from <strong>${name}</strong>. We are committed to providing a safe and supportive environment for all our clients. We will get back to you with more details.

Client Details:
- Name: ${name}
- Email: ${email}
- Phone: ${fullPhone}
- Preferred Psychologist: ${psychologist || "Not specified"}

Message/Concerns:
${message || "No additional message provided."}

Warm regards,
Clearmind Counselling Team
          `,
          html: `
<div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
  <h2 style="color: #6b705c; border-bottom: 2px solid #6b705c; padding-bottom: 10px;">New Therapy Session Request</h2>
  
  <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
  
  <p style="font-size: 16px; line-height: 1.6;">We have received a new therapy session request from <strong>${name}</strong>. We are committed to providing a safe and supportive environment for all our clients. We will get back to you with more details.</p>
  
  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #6b705c;">Client Details</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
      <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
      <li style="margin-bottom: 8px;"><strong>Phone:</strong> ${fullPhone}</li>
      <li style="margin-bottom: 8px;"><strong>Preferred Psychologist:</strong> ${psychologist || "Not specified"}</li>
    </ul>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="color: #6b705c;">Message/Concerns</h3>
    <p style="font-style: italic; background-color: #fff; padding: 10px; border-left: 4px solid #b7b7a4;">
      ${message || "No additional message provided."}
    </p>
  </div>
  
  <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
    Warm regards,<br>
    <strong>Clearmind Counselling Team</strong>
  </p>
</div>
          `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        emailSent = true;
      } catch (error) {
        console.error("Email sending error:", error);
      }
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS not set in environment.");
    }

    if (emailSent) {
      res.json({ 
        success: true, 
        message: "Appointment request received successfully! We will contact you soon via email." 
      });
    } else {
      console.warn("No notification services configured. Simulating success.");
      res.json({ 
        success: true, 
        message: "Appointment request received (Simulated). Please configure Email in settings for real notifications." 
      });
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;
    console.log("New Newsletter Subscription:", { email });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.json({ success: true, message: "Subscribed successfully (Simulated)!" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.verify();

      const mailOptions = {
        from: `"Clearmind Counselling" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to Clearmind Counselling Newsletter",
        text: `
Hello,

Thank you for subscribing to our newsletter. We are honored to have you as part of our community.

You will receive monthly insights on mental health, emotional wellbeing, and updates from our team of psychologists.

If you ever need immediate support, please don't hesitate to reach out to us.

Warm regards,
Clearmind Counselling Team
        `,
        html: `
<div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
  <h2 style="color: #6b705c; border-bottom: 2px solid #6b705c; padding-bottom: 10px;">Welcome to Our Community</h2>
  
  <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
  
  <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing to the <strong>Clearmind Counselling</strong> newsletter. We are honored to have you with us.</p>
  
  <p style="font-size: 16px; line-height: 1.6;">Our mission is to provide a safe space for healing and growth. Through this newsletter, we'll share monthly insights on mental health, emotional wellbeing, and updates from our expert team.</p>
  
  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <p style="margin: 0; color: #6b705c; font-weight: bold;">"Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity."</p>
  </div>
  
  <p style="font-size: 16px; line-height: 1.6;">If you ever feel overwhelmed or just need someone to talk to, our doors (and inbox) are always open.</p>
  
  <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
    Warm regards,<br>
    <strong>Clearmind Counselling Team</strong>
  </p>
</div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Subscribed successfully! Check your inbox for a welcome message." });
    } catch (error) {
      console.error("Subscription email error:", error);
      res.json({ success: true, message: "Subscribed successfully!" }); // Still return success to user
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
