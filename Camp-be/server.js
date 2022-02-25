const express = require("express"); // 引用express
require("dotenv").config(); // 引用dntenv
const connection = require("./utils/db"); // 引用 utils 中的db.js
// const cors = require("cors"); // 引用cors
let app = express(); // 利用 express 這個 library 來建立一個 web app (express instance)

app.use(express.urlencoded({ extended: true })); // express.urlencoded 要讓express認得body裡的資料


// 在哪個port上執行
const port = process.env.SERVER_PORT || 3002;
// app.listen(port, () => {
//   console.log(`server running at port ${port}`);
// });

// const port = 3002; // your server port
const db = require("./utils/db2");
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
   
    return res.status(422).send({ error: error[0].msg }); // 若有錯誤則回傳錯誤內容
  }

  let hashPassword = bcrypt.hashSync(req.body.password, 10);

  db.query(
    `INSERT INTO user(name,user_name,phone,bday, password,gender,created_time) VALUES ('${name}','${user_name}','${phone}','${date}', '${hashPassword}','${gender}','${created_time}')`,
    function (err, rows, fields) {
   
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

//member Router
let memberRouter = require("./routers/member");
app.use("/member", memberRouter);

//登出
app.get("/logout", (req, res, next) => {
  req.session.member = null;
  res.sendStatus(202);
});
//Forgotpassword 忘記密碼功能
const nodemailer = require("nodemailer");
//const crypto = require("crypto");

app.post("/forgotPassword", (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xie6493@gmail.com",
      pass: "xiemfee22",
    },
  });

  const mailOptions = {
    from: "xie6493@gmail.com",
    to: `${req.body.email}`,
    subject: "Link To Reset Password",
    text: "TEST",
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

//營地列表
app.get("/camplist", (req, res, next) => {
  db.query(
    "select camp.*,tent.*,tent_cate1.*,camp_county.*,camp_cate1.*,camp_pic.*,round(AVG(camp_stars),0) AS stars from camp JOIN tent ON camp.Cid = tent.camp_id JOIN tent_cate1 ON tent.tentcate_id = tent_cate1.id JOIN camp_county ON camp.campcounty_id = camp_county.Yid JOIN camp_cate1 ON camp.campcate1_id = camp_cate1.id JOIN camp_pic ON camp.Cid = camp_pic.camp_id JOIN camp_rate ON camp.Cid = camp_rate.camp_id GROUP BY camp.Cid",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);

      res.send(rows);
    }
  );
});
//圖片
app.use("/static", express.static(path.join(__dirname, "public", "img")));

//縣市資料
app.get("/county", (req, res, next) => {
  db.query("SELECT * FROM camp_county", function (err, rows) {
    if (err) throw err;
    //console.log("Response: ", rows);

    res.send(rows);
  });
});
//營地環境資料
app.get("/cate", (req, res, next) => {
  db.query("SELECT * FROM camp_cate1", function (err, rows) {
    if (err) throw err;
    //console.log("Response: ", rows);

    res.send(rows);
  });
});
//帳篷資料
app.get("/tent", (req, res, next) => {
  db.query("SELECT * FROM tent_cate1", function (err, rows) {
    if (err) throw err;
    //console.log("Response: ", rows);

    res.send(rows);
  });
});

//北區資料
app.get("/region1", (req, res, next) => {
  db.query(
    "SELECT * FROM camp_county WHERE campregion_id = 1 ",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);

      res.send(rows);
    }
  );
});

//中區資料
app.get("/region2", (req, res, next) => {
  db.query(
    "SELECT * FROM camp_county WHERE campregion_id = 2 ",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);

      res.send(rows);
    }
  );
});
//南區資料
app.get("/region3", (req, res, next) => {
  db.query(
    "SELECT * FROM camp_county WHERE campregion_id = 3 ",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);

      res.send(rows);
    }
  );
});
//東區資料
app.get("/region4", (req, res, next) => {
  db.query(
    "SELECT * FROM camp_county WHERE campregion_id = 4 ",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);

      res.send(rows);
    }
  );
});

// -----------------------------------------------------------------
// 商品、購物車、結帳流程
let productDetailRouter = require("./routers/product");
app.use(productDetailRouter);

// -----------------------------------------------------------------
//營地詳細
let campRouter = require("./routers/campDetail");
app.use("/api/camp", campRouter);

app.get("/api/camp/:campId", async (req, res, next) => {
  //req.params.campId
  let [data, field] = await connection.execute(
    "SELECT * FROM(camp JOIN camp_county ON camp.campcounty_id = camp_county.Yid ) JOIN camp_pic ON camp.Cid = camp_pic.id WHERE Cid=?",
    [req.params.campId]
  );
  res.json(data);
});
// 單一營地圖片
app.use("/camp-pic", express.static(path.join(__dirname, "public")));
