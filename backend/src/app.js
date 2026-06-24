const express = require("express");
const cors = require("cors");
const bfhlRoutes = require("./routes/bfhl.routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
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
