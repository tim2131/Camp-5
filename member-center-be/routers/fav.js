// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const favAllPo = require("../controllers/fav.js");

router.post("/", favAllPo.asyncAllFav);

module.exports = router;
