// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const registerRules = [
  // 檢查 email 是否符合格式
  body("email").isEmail().withMessage("Email 欄位請填寫正確格式"),
  body("password").isLength({ min: 8 }).withMessage("密碼長度至少為 8"),
  body("confirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼驗證不一致"),
];
// RESTful API 的列表
router.post("/", registerRules,
  async (req, res, next) => {
    // 拿到驗證的結果
    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
      // validateResult 不是空的
      let error = validateResult.array();
      console.log("validateResult", error);
      return res.status(400).json({
        code: "33001",
        msg: error[0].msg,
      });
    }
    // 雜湊 password
    let hashPassword = await bcrypt.hash(req.body.password, 10);

    // 儲存到資料庫
    let [result] = await connection.execute(
      "UPDATE user SET user_name =?,gender =?,phone =?, address =?, name =?,bday =?,password=? WHERE id =? ",
      [
        req.body.email,
        req.body.gender,
        req.body.phone,
        req.body.address,
        req.body.name,
        req.body.datePicker,
        hashPassword,
        1,
      ]
    );
    console.log(result);

    res.json({ message: "ok" });
  });



module.exports = router;