// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const campAllPo = require("../controllers/campPO.js");

// RESTful API 的列表
// 後端資料的網址
router.post("/", campAllPo.asyncCampOrder);
// router.get("/:stockId", stockController.getPriceByCode);


module.exports = router;