// 引入 express
const express = require("express");
require("dotenv").config();
// path 是 nodejs 內建的
const path = require("path");
const cors = require("cors");



// 利用 express 這個 library 來建立一個 web app (express instance)
let app = express();

app.use(
  cors({
    // 為了要讓 browser 在 CORS 的情況下還是幫我們送 cookie
    origin: ["http://localhost:8000"],
    credentials: true,
  })
);

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession(
    {
      store: new FileStore({ path: path.join(__dirname, "..", "sessions") }),
      secret: "mfee22",
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: false }
    }

  )
);



// 啟用 session
// const expressSession = require("express-session");


// app.use(function (request, response, next) {});
// app.get("/", function(request, response, next) {});


app.use((req, res, next) => {
    console.log("這是一個沒有用的中間件");
    // throw new Error("故意製造的錯誤");
  next();
});

// -----------------------------------------------------------------
let loginRouter = require("./routers/login");
app.use("/api/login", loginRouter);


let memberInfoRouter = require("./routers/member");
app.use("/api/memberInfo", memberInfoRouter);


let memberUpdateRouter = require("./routers/member_update");
app.use("/api/memberInfo1", memberUpdateRouter);

let campAllPoRouter = require("./routers/campAllPO");
app.use("/api/campAllPO", campAllPoRouter);

let campPOpplRouter = require("./routers/campPODetail");
app.use("/api/campPOppl", campPOpplRouter);
let campPOCampRouter = require("./routers/campPODetailCamp");
app.use("/api/campPOCamp", campPOCampRouter);
let campPOTentRouter = require("./routers/campPODetailTent");
app.use("/api/campPOTent", campPOTentRouter);
let campPOActRouter = require("./routers/campPODetailAct");
app.use("/api/campPOAct", campPOActRouter);
let cancelPORouter = require("./routers/cancelPO")
app.use("/api/cancelPO", cancelPORouter);
let ratePORouter = require("./routers/ratePO");
app.use("/api/ratePO", ratePORouter);
let favAllRouter = require("./routers/fav");
app.use("/api/favAll", favAllRouter);
let request = require("./routers/getMember")
app.use("/api/getMember",
  request
  // (req, res, next) => {
  //  res.send("Hello Middleware");}
);



//-----------------------------------------------------------------
// 使用 express 內建的中間件
// 靜態檔案: 圖片、js 檔案、css 檔案, html...
// 寫法1: 不要有 網址 prefix
// http://localhost:3005/images/camp1.jpg
app.use(express.static(path.join(__dirname, "assets")));
// 寫法2: 有網址的 prefix
// localhost:3002/static/index.html --> 網址上就會有這個 url prefix
// app.use("/static", express.static(path.join(__dirname, "public")));


//-------------------------------------------------------------------
app.use((req, res, next) => {
  console.log("在所有路由中間件的後面 -> 404");
  res.status(404).send("Not Found");
});
app.use((req, res, next) => {
//  res.send("Hello Middleware");
});

// 錯誤中間件：放在所有中間件的後面
// 有四個參數，是用來「捕捉」錯誤的
app.use((err, req, res, next) => {
  console.log("來自四個參數的錯誤處理中間件", err);
  res.status(500).send("Server 錯誤: 請洽系統管理員");
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
