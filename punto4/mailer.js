const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  pool: true, 
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmail(to, subject, htmlContent) {
  const mailOptions = {
    from: `"Mailer App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error enviando a ${to}:`, error.message);
  }
}

module.exports = sendEmail;
