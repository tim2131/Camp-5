
const express = require("express");
const app = express();
const port = 3002;
const db = require("./utils/db");
require("dotenv").config();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

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


// let AddTent = require("./models/tent")
// app.post("/AddTent", function (req, res) {
//   const {name, number, price, img, intro}= req.body;
//   db.query(`INSERT INTO tent (name, number, price, img, intro) VALUES ('${name}', '${number}', '${price}', '${img}', '${intro}')`,function(err, rows, fields) {
//     if (err) throw err;
//     return res.send({ message: "成功" });
//   })
// })


app.get("/Tent", (req, res, next) => {
  db.query(
    "select * from tent",
    function (err, rows) {
      if (err) throw err;
      //console.log("Response: ", rows);

      res.send(rows);
    }
  );
});
