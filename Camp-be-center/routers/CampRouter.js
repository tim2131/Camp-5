const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bcrypt = require("bcrypt");
require("dotenv").config();



router.get("/Tent", (req, res, next) => {
    db.query(
      "SELECT * FROM tent WHERE camp_id=1 AND valid=1",
      function (err, rows) {
        if (err) throw err;
        //console.log("Response: ", rows);
        res.send(rows);
      }
    );
  });

router.post("/TentAdd", (req, res, next) => {
    console.log('req.body',req.body);
    db.query(
      `INSERT INTO tent(name,price,number,img,tentcreated_time,intro) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.number}', '${req.body.img}', '${req.body.date}', '${req.body.intro}')`,
      function (err, rows) {
        if (err) throw err;
        console.log("Response: ", rows);
        db.query(
          `UPDATE tent SET camp_id=1, tentcate_id=${rows.insertId} WHERE id=${rows.insertId}`,
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
  
  router.post("/TentDel", (req, res, next) => {
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
  
  router.post("/TentUpdate", (req, res, next) => {
    console.log('body',req.body);
  
    db.query(
      `UPDATE tent SET name='${req.body.name}',price=${req.body.price},number='${req.body.number}',img='${req.body.img}',tentcreated_time='${req.body.date}',intro='${req.body.intro}' WHERE id=${req.body.id}`,
      function (err, rows) {
        if (err) throw err;
        console.log("Response: ", rows);
        res.send(rows);
      }
    );
  
  });
  
  
  router.get("/Act", (req, res, next) => {
    db.query(
      "SELECT * FROM add_act_intro WHERE valid=1",
      function (err, rows) {
        if (err) throw err;
        //console.log("Response: ", rows);
        res.send(rows);
      }
    );
  });
  
  router.post("/ActAdd", (req, res, next) => {
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
  
  router.post("/ActDel", (req, res, next) => {
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
  
  router.post("/ActUpdate", (req, res, next) => {
    console.log('body',req.body);
  
    db.query(
      `UPDATE add_act_intro SET name='${req.body.name}',price=${req.body.price},pic='${req.body.img}',intro='${req.body.intro}' WHERE id=${req.body.id}`,
      function (err, rows) {
        if (err) throw err;
        console.log("Response: ", rows);
        res.send(rows);
      }
    );
  
  });
  
  router.get("/TentOrder", (req, res, next) => {
    db.query(
      "SELECT camp_order.*,user.id,camp_owner.id FROM camp_order JOIN user ON camp_order.user_id = user.id JOIN camp_owner ON camp_order.camp_id = camp_owner.id",
      function (err, rows) {
        if (err) throw err;
        //console.log("Response: ", rows);
        res.send(rows);
      }
    );
  });
  
  router.get("/TentProfile", (req, res, next) => {
    db.query(
      "SELECT * FROM camp_owner WHERE id=1",
      function (err, rows) {
        if (err) throw err;
        //console.log("Response: ", rows);
        res.send(rows);
      }
    );
  });
  
  router.post("/TentProfile", (req, res, next) => {
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
  
  
  router.get("/camp_pic", (req, res, next) => {
    db.query(
      "SELECT * FROM `camp_pic`",
      function (err, rows) {
        if (err) throw err;
        console.log("Response: ", rows);
        res.send(rows);
      }
    );
  });

  router.get("/camp_owner_order/:id?",(req,res,next)=>{
    const campOwnerID = req.params.id? req.params.id:1;
    db.query(
      "SELECT camp_order.id,camp_order.camp_id,orderstatus_id,orderdate_start,orderdate_end,camp.Cid, camp.camp_name,camp.campcounty_id, camp_county.Yid, camp_county.camp_county,camp_pic.camp_id,camp_pic.img1 FROM camp_order LEFT JOIN camp ON camp_order.camp_id=camp.Cid LEFT JOIN camp_county ON camp_county.Yid=camp.campcounty_id LEFT JOIN camp_pic ON camp.Cid=camp_pic.camp_id WHERE camp_order.camp_id=" + campOwnerID + " ORDER BY orderdate_start ASC;",
      function(err,rows){
        if(err) throw err;
        // console.log("Response:", rows);
        res.send(rows);
      }
    )
  })


  router.get("/Ppl/:id?",(req,res,next)=>{
    const orderID = req.params.id? req.params.id:1;
    db.query(
      "SELECT * FROM camp_order LEFT JOIN user ON camp_order.user_id=user.id LEFT JOIN coupon on coupon.id=camp_order.coupon WHERE camp_order.id=" + orderID,
      function(err,rows){
        if(err) throw err;
        // console.log("Response123:", rows);
        res.send(rows);
      }
    )
  })

  router.get("/Tent/:id?",(req,res,next)=>{
    const orderID = req.params.id? req.params.id:1;
    db.query(
      "SELECT * FROM camp_orderdet LEFT JOIN camp_order ON camp_orderdet.camporder_id=camp_order.id JOIN tent ON camp_orderdet.tent_id=tent.id LEFT JOIN tent_cate1 on tent.tentcate_id=tent_cate1.id LEFT JOIN order_status ON camp_order.orderstatus_id=order_status.id WHERE camporder_id=" + orderID,
      function(err,rows){
        if(err) throw err;
        // console.log("Response:", rows);
        res.send(rows);
      }
    )
  })
  router.get("/OrderDetailsAct/:id?",(req,res,next)=>{
    const orderID = req.params.id? req.params.id:1;
    db.query(
      "SELECT * FROM camp_order LEFT JOIN add_act_order ON camp_order.add_act_id=add_act_order.id LEFT JOIN add_act_orderdet ON add_act_orderdet.activity_order_id=add_act_order.id LEFT JOIN add_act_intro ON add_act_orderdet.activity_id=add_act_intro.id  WHERE camp_order.id=" + orderID,
      function(err,rows){
        if(err) throw err;
        // console.log("Response:", rows);
        res.send(rows);
      }
    )
  })
  router.get("/campData/:id?",(req,res,next)=>{
    const orderID = req.params.id? req.params.id:1;
    db.query(
      "SELECT * FROM camp_order LEFT JOIN camp ON camp_order.camp_id=camp.Cid LEFT JOIN camp_cate1 ON camp.campcate1_id=camp_cate1.id LEFT JOIN camp_county ON camp.campcounty_id=camp_county.Yid LEFT JOIN camp_owner ON camp.campowner_id=camp_owner.id LEFT JOIN camp_pic ON camp.Cid=camp_pic.camp_id LEFT JOIN order_status ON camp_order.orderstatus_id=order_status.id LEFT JOIN tent ON camp_order.camp_id=tent.id WHERE camp_order.id=" + orderID,
      function(err,rows){
        if(err) throw err;
        console.log("campData Response:", rows);
        res.send(rows);
      }
    )
  })
  router.get("/CampOwnerPic"),(req,res,next)=>{
    db.query(
      "SELECT * FROM `campowner_pic`",
      function (err, rows) {
        if (err) throw err;
        console.log("Response: ", rows);
        res.send(rows);
      }
    );
  };
  
  //登出
  router.get("/logOut", (req, res, next) => {
    req.session.campmember = null;
    res.sendStatus(202);
  });

  module.exports = router;