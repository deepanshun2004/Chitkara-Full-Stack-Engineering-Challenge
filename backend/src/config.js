const dotenv = require("dotenv");

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "",
  userId: process.env.USER_ID || "deepanshunayyar_16042004",
  emailId: process.env.EMAIL_ID || "[deepanshu1561.be23@chitkara.edu.in](mailto:deepanshu1561.be23@chitkara.edu.in)",
  rollNumber: process.env.ROLL_NUMBER || "2310991561"
};

module.exports = config;
