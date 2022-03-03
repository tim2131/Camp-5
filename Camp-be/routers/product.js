const express = require("express");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");

const connection = require("../utils/db");

// 總商品列表
router.get("/api/products", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM product");
  // console.log(data);
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

// 商品詳細頁愛心
router.get("/api/product-fav/:productId", async (req, res, next) => {
  let [data] = await connection.execute(
    "SELECT * FROM product_fav WHERE product_id=?",
    [req.params.productId]
  );
  res.json(data);
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

// 購物車------------------------------------------------
// 測試用user
router.get("/api/user/1", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM user WHERE id=1"
  );
  res.json(data);
});

// 購物車愛心
router.get("/api/user/1/fav-product", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM product_fav WHERE user_id=1"
  );
  res.json(data);
});
router.post("/api/user/1/fav-product/add", async (req, res, next) => {
  let [addFav] = await connection.execute(
    "INSERT INTO product_fav VALUES (?, 1, 1)",
    [req.body.id]
  );
  // console.log(req.body.id);
  res.json({ msg: "add fav ok" });
});
router.post("/api/user/1/fav-product/remove", async (req, res, next) => {
  let [removeFav] = await connection.execute(
    "DELETE FROM product_fav WHERE product_id=?",
    [req.body.id]
  );
  // console.log(req.body.id);
  res.json({ msg: "remove fav ok" });
});

// 折扣碼
router.post("/api/products/coupon/1", async (req, res, next) => {
  let [couponInput] = await connection.execute(
    "SELECT * FROM coupon WHERE user_id=1 AND promo_code=? AND status=1",
    [req.body.coupon]
  );
  if (couponInput.length === 0) {
    return res.status(400).send({
      msg: "無法使用此折扣碼",
    });
  }
  // res.json({ msg: "coupon ok" });
  res.json(couponInput);
});

// 結帳流程-----------------------------------------------
// 信用卡資料
router.post("/api/products/payment", async (req, res, next) => {
  // 儲存到資料庫
  // let [result] = await connection.execute("");
  console.log("req body: ", req.body);
  res.json({ message: "ok" });
});

// 信用卡地址
router.post("/api/products/credit-card-shipment", async (req, res, next) => {
  // 儲存到資料庫
  // let [result] = await connection.execute("");
  console.log("shipment req body: ", req.body);
  res.json({ message: "shipment ok" });
});

// 超商資料
router.post(
  "/api/products/convenience-store-shipment",
  async (req, res, next) => {
    // 儲存到資料庫
    // let [result] = await connection.execute("");
    console.log("shipment req body: ", req.body);
    res.json({ message: "shipment ok" });
  }
);

// 購物車進資料庫--------------------------------------------
router.post("/api/products/send-order", async (req, res, next) => {
  let [order] = await connection.execute(
    "INSERT INTO product_order (orderstatus_id, user_id, fare, total, coupon) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.payment,
      1,
      req.body.delivery_charge,
      req.body.final_total,
      req.body.used_coupon,
    ]
  );
  let [couponStatus] = await connection.execute(
    "UPDATE coupon SET status=0 WHERE promo_code=?",
    [req.body.used_coupon]
  );
  let [point] = await connection.execute("UPDATE user SET point=? WHERE id=1", [
    req.body.remain_point,
  ]);
  // console.log("order req body: ", req.body);
  res.json({ message: "order ok" });
});

router.post("/api/products/send-orderdet", async (req, res, next) => {
  let [lastProductOrderid] = await connection.execute(
    "SELECT product_orderid FROM `product_orderdet`  ORDER BY id DESC LIMIT 0 , 1"
  );
  let ProductOrderid = lastProductOrderid[0]["product_orderid"] + 1;
  await req.body.forEach(async (item, i) => {
    let [orderdet] = await connection.execute(
      "INSERT INTO product_orderdet (product_id, product_orderid, color, size, quantity, valid) VALUES (?, ?, ?, ?, ?, ?)",
      [item.Pid, ProductOrderid, item.color, item.size, item.amount, 1]
    );
  });
  // console.log("orderId to another", orderId);
  // console.log("orderdet req body: ", req.body);
  res.json({ message: "orderdet ok" });
});

module.exports = router;
