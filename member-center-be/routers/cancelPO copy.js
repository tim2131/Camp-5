const express = require("express");
const router = express.Router();
const cancelPOController=require("../controllers/cancelPOController")

// RESTful API 的列表
router.post("/", cancelPOController.asyncCancelPO);

module.exports = router;