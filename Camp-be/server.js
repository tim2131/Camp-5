const express = require("express"); // 引用express
require("dotenv").config(); // 引用dntenv
const connection = require("./utils/db"); // 引用 utils 中的db.js
const port = process.env.SERVER_PORT || 3002;
const sessionSecret = process.env.SESSION_SECRET || "mfee22";
const path = require("path");
let app = express(); // 利用 express 這個 library 來建立一個 web app (express instance)
app.use(express.urlencoded({ extended: true })); // express.urlencoded 要讓express認得body裡的資料

//session
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, "..", "sessions"),
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false },
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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//member Router
let memberRouter = require("./routers/member");
app.use("/member", memberRouter);

let campmemberRouter = require("./routers/campmember");
app.use("/campmember", campmemberRouter);

//登入註冊登出
let logingSignupRouter = require("./routers/login");
app.use(logingSignupRouter);

//營地列表
let campListdRouter = require("./routers/camplist");
app.use(campListdRouter);
//商品列表
let productsListRouter = require("./routers/productslist");
app.use(productsListRouter);
// -----------------------------------------------------------------
// 商品、購物車、結帳流程
let productDetailRouter = require("./routers/product");
app.use(productDetailRouter);

//-------------------------------------------
let campRouter = require("./routers/campDetail");
app.use("/api/camp", campRouter);

app.get("/api/camp/:campId", async (req, res, next) => {
  //req.params.campId
  let [data, field] = await connection.execute(
    "SELECT * FROM camp JOIN camp_county ON camp.campcounty_id = camp_county.Yid  JOIN camp_pic ON camp.Cid = camp_pic.id JOIN camp_cate1 ON camp.campcate1_id = camp_cate1.id JOIN tent_cate1 ON camp.campregion_id = tent_cate1.id WHERE Cid=?",
    [req.params.campId]
  );
  res.json(data);
});

//----------------------------
app.get("/api/tentcate/:campId", async (req, res, next) => {
  //req.params.campId
  let [data, field] = await connection.execute(
    "SELECT * FROM tent JOIN tent_cate1 ON tent.tentcate_id=tent_cate1.id JOIN camp ON tent.camp_id = camp.Cid WHERE Cid=?",
    [req.params.campId]
  );
  res.json(data);
});
//------------------------
//地圖座標
app.get("/api/map/:campId", async (req, res, next) => {
  //req.params.campId
  let [data, field] = await connection.execute(
    "SELECT camp_long,camp_lat  FROM camp WHERE Cid=?",
    [req.params.campId]
  );
  res.json(data);
});
//活動資料
app.get("/api/act/:campId", async (req, res, next) => {
  //req.params.campId
  let [data, field] = await connection.execute(
    "SELECT * FROM camp JOIN add_act_order ON camp.Cid = add_act_order.id JOIN add_act_orderdet ON camp.Cid = add_act_orderdet.activity_order_id JOIN add_act_intro ON add_act_orderdet.activity_id = add_act_intro.id WHERE Cid = ?",
    [req.params.campId]
  );
  res.json(data);
});
// 折扣碼
app.post("/api/products/coupon", async (req, res, next) => {
  // console.log("req.body", req.body);
  // console.log("req.body[1].loginId", req.body[1].loginId);
  console.log(req.body);
  let [couponInput] = await connection.execute(
    "SELECT * FROM coupon WHERE promo_code=? AND status=1",
    [req.body[0].coupon]
  );
  if (couponInput.length === 0) {
    return res.status(400).send({
      msg: "無法使用此折扣碼",
    });
  }
  // res.json({ msg: "coupon ok" });
  res.json(couponInput);
});
// 單一營地圖片
app.use("/camp-pic", express.static(path.join(__dirname, "public")));
// 單一帳棚圖片
app.use("/tent-pic", express.static(path.join(__dirname, "public")));
//單一活動圖片
app.use("/act-pic", express.static(path.join(__dirname, "public")));
