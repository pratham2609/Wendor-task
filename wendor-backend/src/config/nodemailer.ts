import nodemailer, { Transporter } from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

class Mailer {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendResetMail(email: string, resetUrl: string) {
        try {
            await this.transporter.sendMail({
                from: process.env.MAIL_ID,
                to: email,
                subject: "Reset Password for your account",
                html: `Here's the link to reste your password.<br> 
                The link will expire in 1hr.<br> 
                Click the link below to reset your password:\n\n${resetUrl}`,
            });
            return true;
        } catch (err) {
            console.error("Error sending reset mail:", err);
            return false;
        }
    }
}

export const mailer = new Mailer();
