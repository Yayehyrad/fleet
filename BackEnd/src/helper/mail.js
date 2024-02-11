const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using Gmail SMTP server
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "minatech62@gmail.com",
    pass: "gnjisngztrxpbxzi",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

console.log(process.env.PASS, process.env.User, process.env.To);

const sendEmail = async (data) => {
  // Get the dynamic to address from the user
  // const toAddress = process.env.TO_ADDRESS;

  // Create a message object
  const {
    name,
    email,
    verificationToken = null,
    otpVerification = null,
  } = data;
  console.log(name, email, verificationToken, otpVerification);
  const verificationLink = `https://example.com/verify?token=${verificationToken}`; // Replace example.com with your actual verification route

  const mailOptions = {
    from: `"Management" <${"sera"}>`,
    to: "imranhayredin89@gmail.com",
    subject: "Verification",
    text: ``,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Verification</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
    }

    h3 {
      margin-top: 0;
    }

    p {
      margin-bottom: 10px;
    }
    a {
        color: #000;
        text-decoration: none;
      }

    img {
      max-width: 100%;
    }
    </style>
    </head>
    <body>

    <h3>Dear ${data.name},</h3>

    <p>
    I hope this email finds you well.
    </p>
    ${
      otpVerification
        ? `<h4>your opt code : ${otpVerification}</h4>`
        : `<p>Please click the following link to verify your email:
  <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">Link to verify</a></p>`
    }
     
    <h3>Sincerely,</h3>
    </body>
    </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, success) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
};
module.exports = sendEmail;
