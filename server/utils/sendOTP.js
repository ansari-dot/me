import nodemailer from 'nodemailer';

const sendOTP = async(email, otp) => {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        throw new Error('MAIL_USER and MAIL_PASS environment variables must be set');
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER || "0349ansari@gmail.com",
            pass: process.env.MAIL_PASS || "spiy yqov upke viub "
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 5 minutes.</p>`
    };

    await transporter.sendMail(mailOptions);
};

export default sendOTP;