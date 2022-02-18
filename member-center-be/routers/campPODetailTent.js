// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const campPODetail = require("../controllers/campPODetail.js");


router.post("/", campPODetail.asyncCampOrderTent);

module.exports = router;