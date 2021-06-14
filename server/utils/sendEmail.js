const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
  MAILING_SERVICE_EMAIL,
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN
} = process.env

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
)

oauth2Client.setCredentials({
  refresh_token: MAILING_SERVICE_REFRESH_TOKEN
})

const accessToken = oauth2Client.getAccessToken().then(token => token)

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: MAILING_SERVICE_EMAIL,
    clientId: MAILING_SERVICE_CLIENT_ID,
    clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    accessToken
  }
})

const sendEmail = {
  createAccount: ({ name, sendTo, activationURL, cb }) => {
    const mailOptions = {
      from: MAILING_SERVICE_EMAIL,
      to: sendTo,
      subject: 'Yonga Account Created',
      html: `
              <div>
                <h2 style="color: #212121; margin-bottom: 1rem;">Hi ${name},</h2>

                <p syle="margin-bottom: 1rem; color: #212121">Thank you for signing up with our service! Before we move on to the good stuff, there’s just one more step for you to take.
                </p>

                <p syle="margin-bottom: 1rem; color: #212121">Click on this link below to confirm your subscription and we’ll take it from there -
                </p>
                           
                <a href=${activationURL} style="background: #212121; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display:inline-block;   border-radius: 1px; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);">Verify your email address</a>
               
                <p style="margin-top: 1rem; color: #212121;">This account verification is only valid for 30 minutes.</p> 
                <p syle="color: #212121">We hope to see you on the other side,</p>

                <p style="margin-top: 1.5rem;color: #212121">Thanks and regards,</p>
                <p style="color: #212121">Ayong and the Yonga Corporation team</p>
                  
                <hr style="margin: 1rem 0;">

                <p style="margin-top: 1rem;">If you're having trouble clicking the password reset button, copy and paste the URL below into your web browser.</p>

                <a style="margin-top: 1.5rem;color: blue;text-decoration: underline;">${activationURL}</a>
              </div>
          `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => cb(err, infor))
  },

  resetPassword: ({ name, sentTo, resetUrl, cb }) => {
    const mailOptions = {
      from: MAILING_SERVICE_EMAIL,
      to: sentTo,
      subject: 'Yonga Account Password Reset',
      html: `
              <div>
                <h2 style="color: #212121; margin-bottom: 1rem;">Hi ${name},</h2>
                <p syle="margin-bottom: 1rem;"> You recently requested to reset your password for your Yonga account. Click the button below to reset it.
                </p>
                
                <a href=${resetUrl} style="background: #212121; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display:inline-block;   border-radius: 1px; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);">Reset your password</a>

                <p style="margin-top: 1rem;">If you did not request a password reset, please let us know. This password reset is only valid for 30 minutes.</p>

                <p style="margin-top: 1rem;">Thanks and regards,</p>
                <p style="margin-top: 1rem;">Ayong and the Yonga Corporation team</p>
                  
                <hr style="margin: 1rem 0;>

                <p>If you're having trouble clicking the password reset button, copy and paste the URL below into your web browser.</p>

                <a style="margin-top: 1rem;color: blue;text-decoration: underline;">${resetUrl}</a>
               
              </div>
          `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => cb(err, infor))
  }
}

module.exports = sendEmail
