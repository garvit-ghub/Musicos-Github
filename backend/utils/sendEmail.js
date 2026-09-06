const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    await transporter.verify();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        ...(html && { html }),
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
};

module.exports = sendEmail; 