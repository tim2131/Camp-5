// 引入 express
const express = require("express");
require("dotenv").config();
const port = 3002;
const db = require("./utils/db");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
// path 是 nodejs 內建的
const path = require("path");
const bcrypt = require("bcrypt");


// 利用 express 這個 library 來建立一個 web app (express instance)
let app = express();

app.use(
  cors({
    // 為了要讓 browser 在 CORS 的情況下還是幫我們送 cookie
    origin: ["http://localhost:8000","http://localhost:3000"],
    credentials: true,
  })
);
//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 啟用 session
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);

app.use((req, res, next) => {
    console.log("這是一個沒有用的中間件");
    // throw new Error("故意製造的錯誤");
  next();
});


app.use(cors(corsOptions));
//  要讓 express 認得 json
app.use(express.json());
app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});
db.query("SELECT * FROM tent", function (err, rows) {
  if (err) throw err;
   console.log("Response: ", rows);
 });

 app.use(express.static('assets'));

 app.get("/Tent", (req, res, next) => {
  db.query(
    "SELECT * FROM tent",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);
      res.send(rows);
    }
  );
});

app.post("/TentAdd", (req, res, next) => {
  console.log('req.body',req.body);
  db.query(
    `INSERT INTO tent(name,price,number,img,date,intro) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.number}', '${req.body.image}', '${req.body.date}', '${req.body.intro}')`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      db.query(
        `UPDATE tent SET camp_id=${rows.insertId}, tentcate_id=${rows.insertId} WHERE id=${rows.insertId}`,
        function (err, row2) {
          console.log('err',err);
          console.log('row2',row2);
          if (err) throw err;
          res.send(rows);
        }
      );
    }
  );
});

app.post("/TentDel", (req, res, next) => {
  console.log('body',req.body);

  db.query(
    `UPDATE tent SET valid=0 WHERE id=${req.body.delID}`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      res.send(rows);
    }
  );
});

app.post("/TentUpdate", (req, res, next) => {
  console.log('body',req.body);

  db.query(
    `UPDATE tent SET name='${req.body.name}',price=${req.body.price},number='${req.body.number}',img='${req.body.img}',date='${req.body.date}',intro='${req.body.intro}' WHERE id=${req.body.id}`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      res.send(rows);
    }
  );

});


app.get("/Act", (req, res, next) => {
  db.query(
    "SELECT * FROM add_act_intro",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);
      res.send(rows);
    }
  );
});

app.post("/ActAdd", (req, res, next) => {
  console.log('req.body',req.body);
  db.query(
    `INSERT INTO add_act_intro(name,price,pic,intro) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.pic}', '${req.body.intro}')`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      db.query(
        `UPDATE add_act_intro SET id=${rows.insertId} WHERE id=${rows.insertId}`,
        function (err, row) {
          console.log('err',err);
          console.log('row',row);
          if (err) throw err;
          res.send(rows);
        }
      );
    }
  );
});

app.post("/ActDel", (req, res, next) => {
  console.log('body',req.body);

  db.query(
    `UPDATE add_act_intro SET valid=0 WHERE id=${req.body.delID}`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      res.send(rows);
    }
  );
});

app.post("/ActUpdate", (req, res, next) => {
  console.log('body',req.body);

  db.query(
    `UPDATE add_act_intro SET name='${req.body.name}',price=${req.body.price},pic='${req.body.pic}',intro='${req.body.intro}' WHERE id=${req.body.id}`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      res.send(rows);
    }
  );

});

 app.get("/TentOrder", (req, res, next) => {
  db.query(
    "SELECT camp_order.*,user.id,camp_owner.id FROM camp_order JOIN user ON camp_order.user_id = user.id JOIN camp_owner ON camp_order.camp_id = camp_owner.id",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);
      res.send(rows);
    }
  );
});

app.get("/TentProfile", (req, res, next) => {
  db.query(
    "SELECT * FROM camp_owner WHERE id=1",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);
      res.send(rows);
    }
  );
});

app.post("/TentProfile", (req, res, next) => {
  console.log('body',req.body);
  let hashPassword = bcrypt.hashSync(req.body.password, 10);
  db.query(
    `UPDATE camp_owner SET company_name='${req.body.name}',email='${req.body.email}',password='${hashPassword}',address='${req.body.address}',phone='${req.body.phone}' WHERE id=${req.body.id}`,
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      res.send(rows);
    }
  );

});


app.get("/camp_pic", (req, res, next) => {
  db.query(
    "SELECT * FROM `camp_pic`",
    function (err, rows) {
      if (err) throw err;
      console.log("Response: ", rows);
      res.send(rows);
    }
  );
});