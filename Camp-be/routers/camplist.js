const express = require("express");
const router = express.Router();
const path = require("path");

const connection = require("../utils/db");

//營地列表
router.get("/camplist", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "select camp.*,tent.*,tent_cate1.*,camp_county.*,camp_cate1.*,camp_pic.*,round(AVG(camp_stars),0) AS stars from camp JOIN tent ON camp.Cid = tent.camp_id JOIN tent_cate1 ON tent.tentcate_id = tent_cate1.id JOIN camp_county ON camp.campcounty_id = camp_county.Yid JOIN camp_cate1 ON camp.campcate1_id = camp_cate1.id JOIN camp_pic ON camp.Cid = camp_pic.camp_id JOIN camp_rate ON camp.Cid = camp_rate.camp_id WHERE camp.valid =1 GROUP BY camp.Cid "
  );

  res.json(data);
});

//圖片
router.use(
  "/static",
  express.static(path.join(__dirname, "..", "public", "img"))
);

//縣市資料
router.get("/county", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM camp_county");
  res.json(data);
});
//營地環境資料
router.get("/cate", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM camp_cate1");
  res.json(data);
});
//帳篷資料
router.get("/tent", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM tent_cate1");
  res.json(data);
});

//北區資料
router.get("/region1", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_county WHERE campregion_id = 1 "
  );
  res.json(data);
});

//中區資料
router.get("/region2", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_county WHERE campregion_id = 2 "
  );
  res.json(data);
});
//南區資料
router.get("/region3", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_county WHERE campregion_id = 3 "
  );
  res.json(data);
});
//東區資料
router.get("/region4", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM camp_county WHERE campregion_id = 4"
  );
  res.json(data);
});

module.exports = router;
