const express = require("express");
const router = express.Router();
const path = require("path");

const connection = require("../utils/db");

//商品列表
router.get("/productslist", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT product.* , product_pic.img1 , round(AVG(product_stars),0) AS stars ,product_cate_big.*,product_cate_mid.*FROM product JOIN product_pic ON product.Pid = product_pic.product_id JOIN product_rate ON product.Pid = product_rate.product_id JOIN product_cate_big ON product.category_id = product_cate_big.id JOIN product_cate_mid ON product.category2_id=product_cate_mid.id WHERE product.valid = 1 GROUP BY product.Pid"
  );

  res.json(data);
});

//商品分類
router.get("/productscate", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT product_cate_mid.id,product_cate_mid.item FROM product_cate_mid WHERE big_category_id =1"
  );

  res.json(data);
});

router.get("/productscate2", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT product_cate_mid.id,product_cate_mid.item FROM product_cate_mid WHERE big_category_id =2"
  );

  res.json(data);
});

router.get("/productscate3", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT product_cate_mid.id,product_cate_mid.item FROM product_cate_mid WHERE big_category_id =3"
  );

  res.json(data);
});

//圖片
router.use(
  "/static",
  express.static(path.join(__dirname, "..", "public", "img"))
);

module.exports = router;
