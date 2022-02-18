// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const campPODetail = require("../controllers/campPODetail.js");

// RESTful API 的列表
// 後端資料的網址
router.post("/", campPODetail.asyncCampOrderCamp);

module.exports = router;