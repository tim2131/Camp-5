import React from 'react';
import { Input } from 'antd';
import $http from '../../libs/Activity/ajax';
import Image1 from "../../images/camp20.jpg";
import Image2 from "../../images/camp2.jpg";
import Image3 from "../../images/camp19.jpg";
import Image4 from "../../images/camp8.jpg";
import Image5 from "../../images/camp16.jpg";
import Image6 from "../../images/camp1.jpg";





export const getTableUsers = params => {
 
  const data = [];
 
    data.push(
      {
      id: 1,
      name: '毛小孩同露營',
      number: '有毛小孩的家庭也能帶著牠們輕鬆去露營嗎？當然可以！',
      price: "NT$1000",
      image: <img src={Image1} alt="Tent1" width={70} height={60}/>,
      date: "2022/2/20",
      },
      {
        id: 2,
        name: '單車遊景點',
        number:"提供自行車,吹著風擁抱大自然!",
        price: "NT$500",
        image: <img src={Image2} alt="Tent2" width={70} height={60}/>,
        date: "2022/2/20",
      },
      {
        id: 3,
        name: '手作DIY體驗',
        number: "傳達人與人之間的溫暖以及帶給您完成手作的成就感!",
        price: "NT$300",
        image: <img src={Image3} alt="Tent3" width={70} height={60}/>,
        date: "2022/2/20",
      },
      );

  return Promise.resolve(data);
};


export const getTableNone = params => (
  $http.get('api/pageWhichIsNo', params)
    .then(data => Promise.resolve(data))
);

export default {
  getTableUsers,
  getTableNone,
};

