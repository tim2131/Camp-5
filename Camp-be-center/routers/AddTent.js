// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const AddTent = require("../controllers/AddTent.js");


router.get("/:POId", AddTent.asyncAddTent);

module.exports = router;