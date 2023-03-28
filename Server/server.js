const express = require('express');
const app = express();
const sgMail = require('@sendgrid/mail')
require('dotenv').config({ path: './.env' })






app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

sgMail.setApiKey (process.env.SENDGRID_API_KEY)//('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') //

const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY/* 'sk_test_51MamPiLPNdUzkCF3xdRvn0nkLpOrsJFo1um4Z7e07FlQXH6T7HCHhRxYkVjkK2iPW61EMZKoDM0ml6YSdWmAPcEn00E3jb1Gcr' */, {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-one-time-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-one-time-payments"
  }
});


function SendSMS(number, txt){
  const accountSid = process.env.TWILIO_ACCOUNT_SID //'ACbe9bf767831def2a48f2248159f21063'//;
  const authToken = process.env.TWILIO_AUTH_TOKEN  //'282e78a16c0df0f1cf73acbf4bdab09d'//;
  const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: txt,
     from: '+18888236109',
     to: number
   })
  .then(message => console.log(message.sid));

}

app.post('/sendSMS', async (req, res) => {
  try {
    const { number, email, emailMSG, txt, title } = req.body;

   
    const mail = {
    to:   email, // Change to your recipient
    from: 'dikeemmanuel54@gmail.com', // Change to your verified sender
    subject: title,
    text: 'AWH ORDER',
    html: `<div> ${emailMSG} </div>`,
    }

    sgMail
    .send(mail)
    .then((response) => {

    })
    .catch((error) => {
      console.error(error)
    })

    await SendSMS(number, txt);
    res.status(200).json({ message: 'SMS sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send SMS.' });
  }
});




app.post('/create-payment-intent' ,async (req, res) =>{
    const {amount} = req.body
    const chargeAmount = (amount * 100)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: chargeAmount,
        currency: 'usd',
        
    })
    
    res.send({
        clientSecret: paymentIntent.client_secret,
    })
})


app.listen(4242, ()=>{
    console.log('running 4242')
})
















