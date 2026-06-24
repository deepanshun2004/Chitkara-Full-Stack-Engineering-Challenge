const express = require("express");
const cors = require("cors");
const config = require("./config");
const bfhlRoutes = require("./routes/bfhl.routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors({
  origin: config.nodeEnv === "production" ? config.frontendUrl : true,
  credentials: false
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Chitkara BFHL Hierarchy API is running",
    health: "ok"
  });
});

app.use("/", bfhlRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
