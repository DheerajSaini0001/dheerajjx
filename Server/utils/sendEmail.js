const nodemailer = require('nodemailer');

// To send an email using Gmail, you need an "App Password" from your Google Account settings,
// not your regular password.
// Provide these in your .env file:
// EMAIL_HOST=smtp.gmail.com
// EMAIL_PORT=465
// EMAIL_USER=your_email@gmail.com
// EMAIL_PASS=your_app_password

const sendEmail = async (options) => {
    // Basic setup - grabs from env OR attempts to use a fallback dev setup if possible
    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        // True production setup
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    } else {
        // Fallback fake Ethereal account if user hasn't configured .env yet
        console.warn('⚠️ No EMAIL_USER and EMAIL_PASS set in .env! Generating test Ethereal account...');
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    }

    const message = {
        from: `${process.env.FROM_NAME || 'Dheerajj.x Admin Portal'} <${process.env.FROM_EMAIL || 'noreply@dheerajjx.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Add HTML support
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);

    // Log URL to preview test email if using ethereal
    if (!process.env.EMAIL_USER) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};

module.exports = sendEmail;
