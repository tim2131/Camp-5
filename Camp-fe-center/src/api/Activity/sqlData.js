import { Input } from "antd";
import $http from "../../libs/Activity/ajax";
// import Image1 from "../../images/camp12.jpg";
// import Image2 from "../../images/camp13.jpg";
// import Image3 from "../../images/camp9.jpg";
// import Image4 from "../../images/camp8.jpg";
// import Image5 from "../../images/camp16.jpg";
// import Image6 from "../../images/camp1.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IMAGE_URL } from "../../utils/config";

export const getTableUsers = async (params) => {
  // const images = [Image1, Image2, Image3, Image4, Image5, Image6];
  const result = await axios.get(`${IMAGE_URL}/Act`);
  result.data.map((item, index) => {
    item.image = <img src={'http://localhost:3002/images/'+item.pic} alt="Act" width={70} height={60} />;
    return item;
  });
  return result.data;

  // const data = [];

  // data.push(
  //   {
  //     id: 1,
  //     name: "狩獵帳",
  //     number: Math.random().toString() % 2 === 0 ? "5~6人" : "3~4人",
  //     price: "NT$3500",
  //     image: <img src={Image1} alt="Tent1" width={70} height={60} />,
  //     date: "2022/2/20",
  //   },
  //   {
  //     id: 2,
  //     name: "TEE PEE",
  //     number: Math.random().toString() % 2 === 0 ? "3~4人" : "5~6人",
  //     price: "NT$4000",
  //     image: <img src={Image2} alt="Tent2" width={70} height={60} />,
  //     date: "2022/2/20",
  //   },
  //   {
  //     id: 3,
  //     name: "露營車",
  //     number: Math.random().toString() % 2 === 0 ? "3~4人" : "4~5人",
  //     price: "NT$6000",
  //     image: <img src={Image3} alt="Tent3" width={70} height={60} />,
  //     date: "2022/2/20",
  //   },
  //   {
  //     id: 4,
  //     name: "星空帳",
  //     number: Math.random().toString() % 2 === 0 ? "3~4人" : "4~5人",
  //     price: "NT$5000",
  //     image: <img src={Image4} alt="Tent4" width={70} height={60} />,
  //     date: "2022/2/20",
  //   },
  //   {
  //     id: 5,
  //     name: "泡泡帳",
  //     number: Math.random().toString() % 2 === 0 ? "3~4人" : "3~4人",
  //     price: "NT$3500",
  //     image: <img src={Image5} alt="Tent5" width={70} height={60} />,
  //     date: "2022/2/20",
  //   },
  //   {
  //     id: 6,
  //     name: "鐘型帳",
  //     number: Math.random().toString() % 2 === 0 ? "3~4人" : "5~6人",
  //     price: "NT$4500",
  //     image: <img src={Image6} alt="Tent6" width={70} height={60} />,
  //     date: "2022/2/20",
  //   }
  // );
  // return Promise.resolve(data);
};

export const getTableNone = (params) =>
  $http.get("api/pageWhichIsNo", params).then((data) => Promise.resolve(data));

export default {
  getTableUsers,
  getTableNone,
};

