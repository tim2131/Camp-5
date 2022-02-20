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
      // TODO:日期/密碼
      let [result] = await connection.execute(
        "UPDATE user SET user_name =?,gender =?,phone =?, address =?, name =?,bday =?,password=? WHERE id =? ",
        [req.body.email,
          req.body.gender,
          req.body.phone,
          req.body.address,
          req.body.name,
          req.body.datePicker,
          req.body.password,1]
      );
      console.log(result);
  
      res.json({ message: "ok" });
    }
  );



module.exports = router;