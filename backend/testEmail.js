require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

(async () => {
    try {
        await sendEmail(
            process.env.EMAIL_USER,
            'Test Email from Musicos',
            'If you received this, nodemailer is working correctly!'
        );
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('Failed to send test email:', error.message);
    }
})();
