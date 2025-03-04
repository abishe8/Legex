import nodemailer from "nodemailer"
import { google } from "googleapis"


const CLIENT_ID = '888811781592-m9cauprm45jmk9bscseq8j0p9ig1qurn.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04ObavX7OLYY5CgYIARAAGAQSNwF-L9Ir5fEs6b18koe5eDS0tSdeJNMuP7qwLZlI_rCVHOMXJFCBW82H4y17Aqtfp4OoCdjpRkM'

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
