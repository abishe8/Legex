import { sendMail } from "./mail.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./mailTemplate.js"


export const sendVerificationEmail = async (recipientEmail, code) => {
    try {
        const mailOptions = {
            from: 'LegEX <legexdocs@gmail.com>',
            to: recipientEmail,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code),
            category: "Email Verification",
        }
    
        await sendMail(mailOptions);

        console.log("Verfication email sent successfully");
        
    } catch (error) {
        console.log("Error sending verification email", error);
    }
}

export const sendWelcomeEmail = async (recipientEmail, homepageURL) => {
    try {
        const mailOptions = {
            from: 'LegEX <legexdocs@gmail.com>',
            to: recipientEmail,
            subject: "Welcome email",
            html: WELCOME_EMAIL_TEMPLATE.replace("{dashboardLink}", homepageURL),
        }
    
        await sendMail(mailOptions);

        console.log("Welcome email sent successfully");
        
    } catch (error) {
        console.log("Error sending Welcome email", error);
    }
}

export const sendResetPasswordEmail = async (recipientEmail, resetPasswordPageURL) => {
    try {
        const mailOptions = {
            from: 'LegEX <legexdocs@gmail.com>',
            to: recipientEmail,
            subject: "Reset Password email",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetPasswordPageURL),
            category: "Reset Password"
        }
    
        await sendMail(mailOptions);

        console.log("Reset password email sent successfully");
        
    } catch (error) {
        console.log("Error sending Reset password email", error);
    }
}

export const sendResetPasswordSuccessEmail = async (recipientEmail) => {
    try {
        const mailOptions = {
            from: 'LegEX <legexdocs@gmail.com>',
            to: recipientEmail,
            subject: "Reset Password Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Success Email"
        }
    
        await sendMail(mailOptions);

        console.log("Reset password success email sent successfully");
        
    } catch (error) {
        console.log("Error sending Reset password success email", error);
    }
}