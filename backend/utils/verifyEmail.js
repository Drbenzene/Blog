import sgMail from '@sendgrid/mail'
import tokenGenerate from 'uid-generator'


export const sendMail = async (email, token) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: `${email}`, // Change to your recipient
      from: 'support@payyng.com', // Change to your verified sender
      subject: 'Verify your email Address',
      text: 'Welcome to Payyng',
      html: `Click Here To Verify http://localhost:3000/verify/${email}/${token} Your Email Address`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
}

export const generateToken = async () => {
    const token = new tokenGenerate(256, tokenGenerate.BASE62)
    const theToken = await token.generate()
    return theToken
}
