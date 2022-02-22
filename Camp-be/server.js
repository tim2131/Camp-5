// 引用express
const express = require("express");

// 引用dntenv
require("dotenv").config();

// 引用 utils 中的db.js
const connection = require("./utils/db");

// 引用cors
const cors = require("cors");

// 利用 express 這個 library 來建立一個 web app (express instance)
let app = express();

// 使用第三方開發的 cors 中間件
app.use(cors());

// express.urlencoded 要讓express認得body裡的資料
app.use(express.urlencoded({ extended: true }));
// 讓express認得json
app.use(express.json());

// 路由中間件 -----------------------------------------------------------------
// 總商品列表
app.get("/api/products", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM product");
  console.log(data);
  res.json(data);
});

// 單一商品相關
let productDetailRouter = require("./routers/product");
app.use(productDetailRouter);

// 在哪個port上執行
const port = process.env.SERVER_PORT || 3002;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
