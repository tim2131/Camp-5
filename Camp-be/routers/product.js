const express = require("express");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");

const connection = require("../utils/db");

// 總商品列表
router.get("/api/products", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM product");
  console.log(data);
  res.json(data);
});

// 單一商品(join敘述3、圖片)
router.get("/api/products/:productId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM (product JOIN product_spec ON product.Pid = product_spec.product_id) JOIN product_pic ON product.Pid = product_pic.product_id WHERE product.Pid=?",
    [req.params.productId]
  );
  res.json(data);
});

// 單一商品圖片
router.use(
  "/product-pic",
  express.static(path.join(__dirname, "..", "public", "img"))
);

// 單一商品顏色
router.get("/api/products/:productId/color", async (req, res, next) => {
  let [option, fields] = await connection.execute(
    "SELECT * FROM product_color WHERE product_id=?",
    [req.params.productId]
  );
  res.json(option);
});

// 單一商品尺寸
router.get("/api/products/:productId/size", async (req, res, next) => {
  let [option, fields] = await connection.execute(
    "SELECT * FROM product_size WHERE product_id=?",
    [req.params.productId]
  );
  res.json(option);
});

// 單一商品評論
router.get("/api/products/review/:productId", async (req, res, next) => {
  // 取得目前在第幾頁
  let page = req.query.page || 1;

  // 取得目前評論的總筆數
  let [reviwTotal] = await connection.execute(
    "SELECT COUNT(*) AS total FROM product_rate WHERE product_id=?",
    [req.params.productId]
  );
  reviwTotal = reviwTotal[0].total;

  // 一頁幾筆&計算總頁數
  const perPage = 3;
  const lastPage = Math.ceil(reviwTotal / perPage);

  // 計算sql要用的offset
  let offset = (page - 1) * perPage;
  // 取得資料
  let [data] = await connection.execute(
    "SELECT * FROM (product_rate JOIN user ON product_rate.user_id = user.id) JOIN user_pic ON product_rate.user_id = user_pic.user_id WHERE product_rate.product_id=? ORDER BY product_rate.comment_time DESC LIMIT ? OFFSET ? ",
    [req.params.productId, perPage, offset]
  );
  // 拿全部沒分頁
  // let [data, fields] = await connection.execute(
  //   "SELECT * FROM product_rate JOIN user ON product_rate.user_id = user.id WHERE product_rate.product_id=?",
  //   [req.params.productId]
  // );

  // response
  res.json({
    // 總筆數、一頁幾筆、目前所在頁碼、最後一頁的頁碼
    pagination: { reviwTotal, perPage, page, lastPage },
    data,
  });
});

// 單一商品評論-星星平均
router.get(
  "/api/products/reviw/:productId/avarage-star",
  async (req, res, next) => {
    let [data, fields] = await connection.execute(
      "SELECT round(avg(product_stars),0) AS stars FROM product_rate where product_id = ?",
      [req.params.productId]
    );
    res.json(data);
  }
);

// 折扣碼
router.get("/api/products/coupon/:userId", async (req, res, next) => {
  let [option, fields] = await connection.execute(
    "SELECT * FROM product_size WHERE product_id=?",
    [req.params.productId]
  );
  res.json(option);
});

// 信用卡資料
router.post("/api/products/payment", async (req, res, next) => {
  // 儲存到資料庫
  // let [result] = await connection.execute("");
  console.log("req body: ", req.body);
  res.json({ message: "ok" });
});

module.exports = router;
