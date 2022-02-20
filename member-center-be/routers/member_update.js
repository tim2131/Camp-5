// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const memberInfo = require("../controllers/memberInfo.js");
const connection = require("../utils/db");

// RESTful API 的列表
router.post(
    "/",
    async (req, res, next) => {
      // 儲存到資料庫
      let [result] = await connection.execute(
        "UPDATE user SET user_name=?, name=? WHERE id=?",
        [req.body.email, req.body.name, 1]
      );
      console.log(result);
  
      res.json({ message: "ok" });
    }
  );



module.exports = router;