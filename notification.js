const twilio = require("twilio");
const from = process.env.TWILIO_PHONE_FROM;

function notify(message, toPhoneNumber) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client.messages
    .create({ body: message, from, to: toPhoneNumber })
    .then((message) => console.log("SMS OK", message.sid))
    .catch((err) => console.log("SMS Error", err));
}

module.exports = { notify };
