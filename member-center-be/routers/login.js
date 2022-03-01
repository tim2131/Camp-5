const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  console.log("testlogin2:", req.session.member);
  // req.session.member = {id:1};
  res.json(req.session.member);
});

module.exports = router;
