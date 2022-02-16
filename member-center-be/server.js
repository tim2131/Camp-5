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
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 啟用 session
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
// app.use(
//   expressSession({
//     store: new FileStore({
//       path: path.join(__dirname, "..", "sessions"),
//     }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(function (request, response, next) {});
// app.get("/", function(request, response, next) {});

app.use((req, res, next) => {
    console.log("這是一個沒有用的中間件");
    // throw new Error("故意製造的錯誤");
  next();
});

// -----------------------------------------------------------------
let memberInfoRouter = require("./routers/member");
app.use("/api/memberInfo", memberInfoRouter);
let campAllPoRouter = require("./routers/campAllPO");
app.use("/api/campAllPO", campAllPoRouter);




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
