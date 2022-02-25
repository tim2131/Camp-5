const express = require("express"); // 引用express
require("dotenv").config(); // 引用dntenv
const connection = require("./utils/db"); // 引用 utils 中的db.js
// const cors = require("cors"); // 引用cors
let app = express(); // 利用 express 這個 library 來建立一個 web app (express instance)
// app.use(cors()); // 使用第三方開發的 cors 中間件
app.use(express.urlencoded({ extended: true })); // express.urlencoded 要讓express認得body裡的資料
app.use(express.json()); // 讓express認得json

// 在哪個port上執行
const port = process.env.SERVER_PORT || 3002;
// app.listen(port, () => {
//   console.log(`server running at port ${port}`);
// });

// const port = 3002; // your server port
const db = require("./utils/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const path = require("path");

//session
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, "..", "sessions"),
    }),
    secret: "mfee22",
    resave: false,
    saveUninitialized: false,
  })
);
//解決跨域問題、是否拿cookie
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//  要讓 express 認得 json
app.use(express.json());
app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});
//抓資料庫資料
// db.query("select * from user", function (err, rows) {
//   if (err) throw err;
//   console.log("Response: ", rows);
// });

//一般會員登入
app.post("/login", function (req, res) {
  const { user_name, password } = req.body;

  db.query(
    `SELECT * FROM user WHERE user_name='${user_name}'`,
    function (err, rows, fields) {
      if (err) throw err;
      if (rows.length === 0) {
        return res.status(500).send({ error: "帳號或密碼錯誤" });
      }
      //console.log(rows[0]);
      const psRes = bcrypt.compareSync(req.body.password, rows[0].password); // 將使用者輸入的密碼和存在資料庫的密碼進行比較
      if (!psRes) {
        // 比對失敗
        return res.status(500).send({ error: "帳號或密碼錯誤" });
      }
      let member = rows[0];
      let returnMember = {
        id: member.id,
        user_name: member.user_name,
        name: member.name,
      };
      req.session.member = returnMember;
      console.log(returnMember);
      res.json({
        code: "0",
        data: returnMember,
      });
    }
  );
});

//營主登入
app.post("/camplogin", function (req, res) {
  const { email, password } = req.body;

  db.query(
    `SELECT * FROM camp_owner WHERE email='${email}'`,
    function (err, rows, fields) {
      if (err) throw err;
      if (rows.length === 0) {
        return res.status(500).send({ error: "帳號或密碼錯誤" });
      }
      //console.log(rows[0]);
      const psRes = bcrypt.compareSync(req.body.password, rows[0].password); // 將使用者輸入的密碼和存在資料庫的密碼進行比較
      if (!psRes) {
        // 比對失敗
        return res.status(500).send({ error: "帳號或密碼錯誤" });
      }
      let member = rows[0];
      let returnMember = {
        id: member.id,
        email: member.email,
        company_name: member.company_name,
      };
      req.session.member = returnMember;
      console.log(returnMember);
      res.json({
        code: "0",
        data: returnMember,
      });
    }
  );
});

//一般會員註冊
const authControllerUser = (req, res) => {
  const {
    name,
    user_name,
    phone,
    date,
    password,
    confirmPassword,
    gender,
    created_time,
  } = req.body;
  const validationResults = validationResult(req); // 驗證傳過來的內容是否符合我們的要求
  if (!validationResults.isEmpty()) {
    let error = validationResults.array();
    //console.log(error)
    return res.status(422).send({ error: error[0].msg }); // 若有錯誤則回傳錯誤內容
  }

  let hashPassword = bcrypt.hashSync(req.body.password, 10);

  db.query(
    `INSERT INTO user(name,user_name,phone,bday, password,gender,created_time) VALUES ('${name}','${user_name}','${phone}','${date}', '${hashPassword}','${gender}','${created_time}')`,
    function (err, rows, fields) {
      //console.log(err)
      if (err) {
        return res.status(500).send({ error: "此信箱已註冊" });
      }
      return res.send({ message: "REGISTER_SUCCESSFULLY" });
    }
  );
};
app.post(
  "/signupuser",
  [
    body("user_name").isEmail().withMessage("Email 欄位請填寫正確格式"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("密碼必填, 且至少 8 個字元以上"), // 密碼必填, 且至少 8 個字元以上
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
const authControllerCamp = (req, res) => {
  const {
    company_name,
    email,
    phone,
    password,
    confirmPassword,
    address,
    created_time,
  } = req.body;
  const validationResults = validationResult(req); // 驗證傳過來的內容是否符合我們的要求
  if (!validationResults.isEmpty()) {
    let error = validationResults.array();
    //console.log(error)
    return res.status(422).send({ error: error[0].msg }); // 若有錯誤則回傳錯誤內容
  }
  let hashPassword = bcrypt.hashSync(req.body.password, 10);

  db.query(
    `INSERT INTO camp_owner(company_name,email,phone, password,address,created_time) VALUES ('${company_name}','${email}','${phone}', '${hashPassword}','${address}','${created_time}')`,
    function (err, rows, fields) {
      if (err) {
        return res.status(500).send({ error: "此信箱已註冊" });
      }
      return res.send({ message: "REGISTER_SUCCESSFULLY" });
    }
  );
};
app.post(
  "/signupcamp",
  [
    body("email").isEmail().withMessage("Email 欄位請填寫正確格式"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("密碼必填, 且至少 8 個字元以上"), // 密碼必填, 且至少 8 個字元以上
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

//member Router
let memberRouter = require("./routers/member");
app.use("/member", memberRouter);

//登出
app.get("/logout", (req, res, next) => {
  req.session.member = null;
  res.sendStatus(202);
});

// -----------------------------------------------------------------
// 商品、購物車、結帳流程
let productDetailRouter = require("./routers/product");
app.use(productDetailRouter);

// -----------------------------------------------------------------
