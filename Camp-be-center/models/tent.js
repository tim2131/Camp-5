// /models/stock
const connection = require("../utils/db");

// 新增帳篷資料
async function getAllTent() {
    let [data, fields] = await connection.execute(
      `INSRT INTO tent(name,number,price,img,intro) VALUES (``),
      [1]
  
    );
    
    console.log(data);
    console.log(data[0].id)
    return data;
  }
  module.exports = {
    getAllTent,
  };