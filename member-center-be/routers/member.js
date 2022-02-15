// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const memberInfo = require("../controllers/memberInfo.js");

// RESTful API 的列表
// 前端收資料的網址
router.get("/", memberInfo.asyncUserData);


module.exports = router;