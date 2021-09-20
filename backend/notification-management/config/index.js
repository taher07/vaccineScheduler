require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3300,
  uri: process.env.DATABASE_URI || "mongodb://localhost:27017/vaccine-scheduler",
  gapTimeInMinutes: process.env.GAP_TIME_IN_MINUTES || 5,
  startTime: process.env.START_TIME || "10:00",
  endTime: process.env.END_TIME || "16:00",
  rabbitMQurl: process.env.RABBITMQ_URL || 'amqp://localhost',
  secretKey: process.env.SECRET_KEY || "TheGreatTaher",
  twilioSID: process.env.TWILIO_ACCOUNT_SID || "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || ""
}