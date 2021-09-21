const nodemailer = require("nodemailer");
const twilio = require("twilio");
const from = process.env.TWILIO_PHONE_FROM;
const ownerGmail = process.env.OWNER_GMAIL;
const ownerPassword = process.env.OWNER_PASSWORD;
const customerGmail = process.env.CUSTOMER_GMAIL;

function notifyBySMS(message, toPhoneNumber) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client.messages
    .create({ body: message, from, to: toPhoneNumber })
    .then((message) => console.log("SMS OK", message.sid))
    .catch((err) => console.log("SMS Error", err));
}

function notifyByEmail(emailTo, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ownerGmail,
      pass: ownerPassword,
    },
  });

  const mailOptions = {
    from: `Twilight Place <${ownerGmail}>`,
    to: emailTo,
    subject: subject,
    html: message,
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { notifyBySMS, notifyByEmail };
