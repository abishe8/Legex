import nodemailer from "nodemailer"
import { google } from "googleapis"


const CLIENT_ID = ''
const CLIENT_SECRET = ''
const REDIRECT_URI = ''
const REFRESH_TOKEN = ''

const oAuth2Client = new google.auth.OAuth2( CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export async function sendMail(mailOptions){

    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'legexdocs@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken
            }
        })


        const result = await transport.sendMail(mailOptions)

        console.log("Email sent successfully..", result);
        
    } catch (error) {
        console.log("Error sending email", error);
        throw new Error("Error in sending Email:", error);
        
    }
}
