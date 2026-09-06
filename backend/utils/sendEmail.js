const nodemailer = require('nodemailer');

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

let verified = false;

const sendEmail = async (to, subject, text, html) => {
    if (!verified) {
        await transporter.verify();
        verified = true;
    }

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