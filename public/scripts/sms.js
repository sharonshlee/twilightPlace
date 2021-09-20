require('dotenv');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = (message) => {

  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const recipient = process.env.NUMBER_TO_CALL;


  client.messages.create({
    // Log the last few digits of a phone number
    body: message,
    from: twilioPhone,
    to: recipient
  });

}

module.exports = { sendMessage };
