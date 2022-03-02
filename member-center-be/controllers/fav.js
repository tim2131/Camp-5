const favSQLInfo = require("../models/fav.js");

let asyncAllFav = async (req, res, next) => {
  console.log("sesson", req.session)
  let memberId =req.session.member.id

  let data = await favSQLInfo.getAllFav(memberId);
  res.json(data);
};

let asyncDelFav = async (req, res, next) => {
  console.log("sesson", req.session);
  //TODO: 傳入memberID跟campID
  let memberId = 2; //req.session.member.id
  let campId = 1; //req.body.campId
  let data = await favSQLInfo.removeFav(campId, memberId);
  res.json(data);
};

let asyncAddFav = async (req, res, next) => {
  console.log("sesson", req.session);
  //TODO: 傳入memberID跟campID
  let memberId = 2; //req.session.member.id
  let campId = 1; //req.body.campId
  let data = await favSQLInfo.addFav(campId, memberId);
  res.json(data);
};

module.exports = {
  asyncAllFav,
  asyncDelFav,
  asyncAddFav,
};
