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

  app.post("/api/assessment-submit", async (req, res) => {
    const { name, email, assessmentTitle, score, result } = req.body;
    console.log("New Assessment Submission:", { name, email, assessmentTitle, score, result });

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

        const mailOptions = {
          from: `"Clearmind Assessments" <${process.env.EMAIL_USER}>`,
          to: email,
          cc: process.env.EMAIL_USER,
          subject: `${assessmentTitle} Result - ${name}`,
          html: `
<div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fff;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="color: #6b705c; margin-bottom: 5px;">Clearmind Counselling</h2>
    <p style="color: #7b8c7c; font-weight: bold; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Your Assessment Results</p>
  </div>
  
  <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
  <p style="font-size: 16px; line-height: 1.6;">Thank you for taking our <strong>${assessmentTitle}</strong>. Here are your personalized results:</p>
  
  <div style="background-color: #f7f9f7; border-left: 5px solid #6b705c; padding: 25px; border-radius: 8px; margin: 30px 0;">
    <h3 style="margin-top: 0; color: #6b705c;">Summary: ${result.title}</h3>
    <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a; margin-bottom: 20px;">${result.description}</p>
    
    <div style="background-color: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e1e8e1; margin-bottom: 20px;">
      <h4 style="margin-top: 0; color: #6b705c; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Our Recommendation</h4>
      <p style="font-size: 15px; line-height: 1.5; color: #555; margin-bottom: 0;">${result.recommendation}</p>
    </div>

    <div style="background-color: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e1e8e1;">
      <h4 style="margin-top: 0; color: #6b705c; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Management Tips</h4>
      <ul style="padding-left: 20px; color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 0;">
        ${result.tips.map((tip: string) => `<li style="margin-bottom: 8px;">${tip}</li>`).join('')}
      </ul>
    </div>
  </div>
  
  <div style="text-align: center; margin: 40px 0;">
    <p style="margin-bottom: 20px; font-size: 15px; color: #666;">Ready to take the next step toward better mental health?</p>
    <a href="https://ais-dev-wg3dh3qu3j6xrxyiw6vh2s-339902116522.asia-southeast1.run.app/#booking" style="background-color: #6b705c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Book a Professional Consultation</a>
  </div>
  
  <div style="border-top: 1px solid #eee; margin-top: 40px; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
    <p>This assessment is a screening tool and does not replace a clinical diagnosis.</p>
    <p>&copy; 2026 Clearmind Counselling. All rights reserved.</p>
  </div>
</div>
          `,
        };
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err) {
        console.error("Failed to send assessment email:", err);
      }
    }

    res.json({ success: true, emailSent });
  });

  app.post("/api/checkin-submit", async (req, res) => {
    const { name, email, results } = req.body;
    console.log("New Mental Health Check-in Submission:", { name, email, resultsCount: results?.length });

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

        const resultsHtml = results.map((res: any) => `
<div style="background-color: #f7f9f7; border-left: 5px solid #6b705c; padding: 25px; border-radius: 8px; margin: 20px 0;">
  <h3 style="margin-top: 0; color: #6b705c;">${res.title}: ${res.result.title}</h3>
  <p style="font-size: 15px; line-height: 1.5; color: #4a4a4a;">${res.result.description}</p>
  <div style="background-color: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e1e8e1; margin-top: 15px;">
    <strong style="color: #6b705c; font-size: 13px; text-transform: uppercase;">Recommendation:</strong>
    <p style="margin-top: 5px; font-size: 14px;">${res.result.recommendation}</p>
    <strong style="color: #6b705c; font-size: 13px; text-transform: uppercase;">Quick Tips:</strong>
    <ul style="margin-top: 5px; font-size: 14px; padding-left: 20px;">
      ${res.result.tips.slice(0, 3).map((tip: string) => `<li>${tip}</li>`).join('')}
    </ul>
  </div>
</div>
        `).join('');

        const mailOptions = {
          from: `"Clearmind Wellness" <${process.env.EMAIL_USER}>`,
          to: email,
          cc: process.env.EMAIL_USER,
          subject: `Mental Health Check-in Summary - ${name}`,
          html: `
<div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fff;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="color: #6b705c; margin-bottom: 5px;">Clearmind Counselling</h2>
    <p style="color: #7b8c7c; font-weight: bold; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Your Wellness Summary</p>
  </div>
  
  <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
  <p style="font-size: 16px; line-height: 1.6;">Great job completing your mental health check-in. Here is a consolidated summary of your results across multiple areas:</p>
  
  ${resultsHtml}
  
  <div style="text-align: center; margin: 40px 0;">
    <p style="margin-bottom: 20px; font-size: 15px; color: #666;">Take the next step with professional support:</p>
    <a href="https://ais-dev-wg3dh3qu3j6xrxyiw6vh2s-339902116522.asia-southeast1.run.app/#booking" style="background-color: #6b705c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Book a Professional Consultation</a>
  </div>
  
  <div style="border-top: 1px solid #eee; margin-top: 40px; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
    <p>These assessments are screening tools and do not replace professional clinical diagnosis.</p>
    <p>&copy; 2026 Clearmind Counselling. All rights reserved.</p>
  </div>
</div>
          `,
        };
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err) {
        console.error("Failed to send checkin summary email:", err);
      }
    }

    res.json({ success: true, emailSent });
  });

  app.post("/api/event-register", async (req, res) => {
    const { name, email, eventTitle, eventDate, eventTime, eventLocation, joiningLink } = req.body;
    console.log("New Event Registration:", { name, email, eventTitle, eventDate, eventTime, eventLocation });

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

        const mailOptions = {
          from: `"Clearmind Events" <${process.env.EMAIL_USER}>`,
          to: email,
          cc: process.env.EMAIL_USER,
          subject: `Registration Confirmed: ${eventTitle}`,
          html: `
<div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fff;">
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="color: #6b705c; margin-bottom: 5px;">Clearmind Counselling</h2>
    <p style="color: #7b8c7c; font-weight: bold; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Event Registration Confirmed</p>
  </div>
  
  <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
  <p style="font-size: 16px; line-height: 1.6;">
  You have successfully registered for <strong>${eventTitle}</strong>. We are looking forward to having you with us!
  We will get back to you with more details</p>
  
  <div style="background-color: #f7f9f7; border-left: 5px solid #6b705c; padding: 25px; border-radius: 8px; margin: 30px 0;">
    <h3 style="margin-top: 0; color: #6b705c;">Event Details</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="margin-bottom: 12px; display: flex; align-items: center;">
        <span style="font-weight: bold; width: 80px; display: inline-block;">Date:</span> ${eventDate}
      </li>
      <li style="margin-bottom: 12px; display: flex; align-items: center;">
        <span style="font-weight: bold; width: 80px; display: inline-block;">Time:</span> ${eventTime}
      </li>
      <li style="margin-bottom: 12px; display: flex; align-items: center;">
        <span style="font-weight: bold; width: 80px; display: inline-block;">Location:</span> ${eventLocation}
      </li>
    </ul>
  </div>
  
  <p style="font-size: 15px; color: #666; line-height: 1.6;">
    If you have any questions or need to cancel your registration, please reply to this email or contact us via WhatsApp.
  </p>
  
  <div style="border-top: 1px solid #eee; margin-top: 40px; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
    <p>&copy; 2026 Clearmind Counselling. All rights reserved.</p>
  </div>
</div>
          `,
        };
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err) {
        console.error("Failed to send event registration email:", err);
      }
    }

    res.json({ success: true, emailSent });
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
