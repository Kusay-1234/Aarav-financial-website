const nodemailer = require("nodemailer");
require("dotenv").config();

// Check if environment variables are set
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error("GMAIL_USER and GMAIL_PASS must be set in the .env file");
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER, // Sender Gmail address
        pass: process.env.GMAIL_PASS, // App password from Gmail account
    },
});

// Update the sendMail function to accept the recipient's email and other details
const sendMail = async ({ name, email, phone }) => {
    const mailOptions = {
        from: {
            name: 'Aarav Website',
            address: process.env.GMAIL_USER,
        },
        to: process.env.GMAIL_USER, // Change this if you want to send it to a different address
        subject: "New user from Aarav Website",
        text: `Aarav Website user:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`, // plain text body
        html: `<b>New users details:</b><br>Name: ${name}<br>Email: ${email}<br>Phone: ${phone}`, // html body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email has been sent!');
    } catch (error) {
        console.error('Error occurred while sending email:', error.message);
        throw error; // Optional
    }
};

module.exports = sendMail;
