const express = require("express");
const { processBfhlRequest } = require("../controllers/bfhl.controller");

const router = express.Router();

router.post("/bfhl", processBfhlRequest);

module.exports = router;
