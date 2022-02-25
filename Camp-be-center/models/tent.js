// /models/stock
const { re } = require("prettier/doc");
const connection = require("../utils/db");

// 新增帳篷資料
async function AddTent() {
    let [data, fields] = await connection.execute(
      `INSERT INTO tent (name, number, price, img, intro) VALUES (?,?,?,?)`,
      [req.body.name, req.body.number, req.body.price, req.body.img, req.body.intro]  
    );
    
    console.log(data);
    console.log(data[0].id)
    return data;
  };

  // 尋找帳篷資料
  async function GetTent() {
    let [data, fields] = await connection.execute(
      "SELECT * FROM tent WHERE id=?",
      [1]
    );
    console.log(data);
    console.log(data[0].id);
    return data;
  };

  module.exports = {
    AddTent,
    GetTent,
  };