// /stock-be/routes/stock.js
// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const campController = require("../controllers/campDetail");

// RESTful API 的列表
router.get("/", campController.getAll);
// router.get("/:campId", campController.countByCode);

module.exports = router;
