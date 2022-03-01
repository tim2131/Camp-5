const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res, next) {
    // req.session.member
    if (req.session.member) {
      // 表示登入過
      console.log("有session member")
      console.log(`id:`, req.session.member.id);
      next();
    } else {
      // 表示尚未登入
      res.status(400).json({ code: "99999", msg: "尚未登入" });
      console.log("X");
    }
  });

module.exports = router;
