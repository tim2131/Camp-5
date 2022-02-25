const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { body, validationResult } = require("express-validator");

// RESTful API 的列表
router.post("/", async (req, res, next) => {
  const { POId,camp_comment, starValue } = req.body;
  let [result] = await connection.execute(
    "INSERT INTO camp_rate (camp_id	,user_id,order_id,camp_comment,camp_stars) VALUES (?,?,?,?,?) ",
// TODO put camp id and user id
    [1, 1, POId, camp_comment, starValue]
  );
  console.log(result);
  // console.log(`POId:" ${ POId }`);
  res.json(result);
});

module.exports = router;
