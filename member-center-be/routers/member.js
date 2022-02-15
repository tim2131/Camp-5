// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const memberInfo = require("../controllers/memberInfo.js");

// RESTful API 的列表
router.get("/", memberInfo.getAll);


module.exports = router;