// /models/stock
const connection = require("../utils/db");

// 取得帳篷資料
async function getAllCamp() {
    let [data, fields] = await connection.execute(
      "SELECT * FROM tent_cate1 LEFT JOIN tent ON tent_cate1.tentcate_id=tentcate_id WHERE tentcate_id=?",
      [1]
  
    );
    
    console.log(data);
    console.log(data[0].id)
    return data;
  }
  module.exports = {
    getAllCamp,
  };