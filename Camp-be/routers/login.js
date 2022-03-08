const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const connection = require("../utils/db");
const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config();
// 在哪個port上執行
const port = process.env.SERVER_PORT || 3002;

//一般會員登入

router.post("/login", async (req, res, next) => {
  // 確認有沒有這個帳號
  let [members] = await connection.execute(
    "SELECT * FROM user WHERE user_name=?",
    [req.body.user_name]
  );
  console.log(members);
  if (members.length === 0) {
    // 查不到，表示根本沒註冊過
    return res.status(400).send({
      code: "33003",
      msg: "帳號或密碼錯誤",
    });
  }
  // 把會員資料從陣列中拿出來
  let member = members[0];

  // 如果有這個帳號，再去比對密碼
  let result = await bcrypt.compare(req.body.password, member.password);
  if (!result) {
    // 如果比對失敗
    return res.status(400).send({
      code: "33004",
      msg: "帳號或密碼錯誤",
    });
  }
  // 整理需要的資料
  let returnMember = {
    id: member.id,
    user_name: member.user_name,
    name: member.name,
  };

  // 如果密碼比對成功，記錄在 session
  // 寫 session
  req.session.member = returnMember;

  res.json({
    code: "0",
    data: returnMember,
  });
});

//營主登入

router.post("/camplogin", async (req, res, next) => {
  // 確認有沒有這個帳號
  let [members] = await connection.execute(
    "SELECT * FROM camp_owner WHERE email=?",
    [req.body.email]
  );
  //console.log(members);
  if (members.length === 0) {
    // 查不到，表示根本沒註冊過
    return res.status(400).send({
      code: "33003",
      msg: "帳號或密碼錯誤",
    });
  }
  // 把會員資料從陣列中拿出來
  let campmember = members[0];

  // 如果有這個帳號，再去比對密碼
  let result = await bcrypt.compare(req.body.password, campmember.password);
  if (!result) {
    // 如果比對失敗
    return res.status(400).send({
      code: "33004",
      msg: "帳號或密碼錯誤",
    });
  }
  // 整理需要的資料
  let returnMember = {
    id: campmember.id,
    email: campmember.email,
    company_name: campmember.company_name,
  };
  console.log(returnMember);
  // 如果密碼比對成功，記錄在 session
  // 寫 session
  req.session.campmember = returnMember;

  res.json({
    code: "0",
    data: returnMember,
  });
});

//一般會員註冊
const authControllerUser = async (req, res) => {
  const validationResults = validationResult(req); // 驗證傳過來的內容是否符合我們的要求
  if (!validationResults.isEmpty()) {
    let error = validationResults.array();

    return res.status(422).send({ error: error[0].msg }); // 若有錯誤則回傳錯誤內容
  }
  // 檢查 email 是不是已經註冊
  let [members] = await connection.execute(
    "SELECT * FROM user WHERE user_name=?",
    [req.body.user_name]
  );
  console.log(members);
  if (members.length > 0) {
    // 表示有查到這個 email
    // -> 註冊過了
    return res.status(400).send({
      error: "此信箱已註冊",
    });
  }

  let hashPassword = bcrypt.hashSync(req.body.password, 10);

  let [result] = await connection.execute(
    `INSERT INTO user(name,user_name,phone,bday, password,gender,created_time) VALUES (?,?,?,?,?,?,?)`,
    [
      req.body.name,

      req.body.user_name,
      req.body.phone,
      req.body.date,
      hashPassword,
      req.body.gender,
      req.body.created_time,
    ]
  );
  res.json({ message: "ok" });
};
router.post(
  "/signupuser",
  [
    body("user_name").isEmail(),

    body("password")
      .matches(
        /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/
      )
      .withMessage(
        "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位"
      ),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("兩次輸入的密碼不相同"); // 兩次輸入的密碼不相同
        }
        return true;
      }),
  ],
  authControllerUser
);

//營主註冊
const authControllerCamp = async (req, res) => {
  const validationResults = validationResult(req); // 驗證傳過來的內容是否符合我們的要求
  if (!validationResults.isEmpty()) {
    let error = validationResults.array();

    return res.status(422).send({ error: error[0].msg }); // 若有錯誤則回傳錯誤內容
  }
  // 檢查 email 是不是已經註冊
  let [members] = await connection.execute(
    "SELECT * FROM camp_owner WHERE email=?",
    [req.body.email]
  );
  console.log(members);
  if (members.length > 0) {
    // 表示有查到這個 email
    // -> 註冊過了
    return res.status(400).send({
      error: "此信箱已註冊",
    });
  }
  let hashPassword = bcrypt.hashSync(req.body.password, 10);

  let [result] = await connection.execute(
    `INSERT INTO camp_owner(company_name,email,phone, password,address,created_time) VALUES (?,?,?,?,?,?)`,
    [
      req.body.company_name,
      req.body.email,
      req.body.phone,
      hashPassword,
      req.body.address,
      req.body.created_time,
    ]
  );
  res.json({ message: "ok" });
};
router.post(
  "/signupcamp",
  [
    body("email").isEmail(),
    body("password")
      .matches(
        /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/
      )
      .withMessage(
        "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位"
      ),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("兩次輸入的密碼不相同"); // 兩次輸入的密碼不相同
        }
        return true;
      }),
  ],
  authControllerCamp
);

//登出
router.get("/logout", (req, res, next) => {
  req.session.campmember = null;
  req.session.member = null;
  res.sendStatus(202);
});

//----------------Forgotpassword 忘記密碼功能
const nodemailer = require("nodemailer");
const crypto = require("crypto"); //產生亂碼 套件

router.post("/forgotPassword", async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);

  let [members] = await connection.execute(
    "SELECT * FROM user WHERE user_name=?",
    [req.body.email]
  );
  console.log(members);
  if (members.length === 0) {
    // 查不到，表示根本沒註冊過
    return res.status(400).send({
      code: "33003",
      msg: "此信箱未註冊",
    });
  }

  //產生亂碼
  const token = crypto.randomBytes(20).toString("hex");
  console.log("token:", token);

  let [result] = await connection.execute(
    `UPDATE user SET code = ? WHERE user_name =? `,
    [token, req.body.email]
  );

  //選擇寄信箱 帳號 密碼
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xie6493@gmail.com",
      pass: "xiemfee22",
    },
  });

  //EMAIL 自訂訊息
  const mailOptions = {
    from: "xie6493@gmail.com",
    to: `${req.body.email}`,
    subject: "Link To Reset Password",
    text: ` 您的驗證碼:${token}`,
  };

  console.log("sending mail");

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", response);
      res.status(200).json("recovery email sent");
    }
  });
});

const authControllerUserCode = async (req, res, next) => {
  const validationResults = validationResult(req); // 驗證傳過來的內容是否符合我們的要求
  if (!validationResults.isEmpty()) {
    let error = validationResults.array();

    return res.status(422).send({ error: error[0].msg }); // 若有錯誤則回傳錯誤內容
  }

  let [members] = await connection.execute("SELECT * FROM user WHERE code=?", [
    req.body.code,
  ]);
  console.log(members);
  if (members.length === 0) {
    // 查不到，表示根本沒註冊過
    return res.status(400).send({
      code: "33003",
      msg: "驗證碼錯誤",
    });
  }
  // 把會員資料從陣列中拿出來
  let codemember = members[0];
  console.log(codemember);

  let hashPassword = bcrypt.hashSync(req.body.password, 10);
  let [result] = await connection.execute(
    `UPDATE user SET password = ? WHERE code = ? `,
    [hashPassword, req.body.code]
  );
  res.json({ message: "ok" });
};

router.post(
  "/resetpassword",
  [
    body("password")
      .matches(
        /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/
      )
      .withMessage(
        "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位"
      ),
  ],
  authControllerUserCode
);

module.exports = router;
