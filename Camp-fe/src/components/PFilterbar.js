import "../style/camplist.css";
import React from "react";

const PFilterbar = (props) => {
  const { cate, setCate,productcate,productcate2,productcate3} = props;
 

  //環境分類功能  勾選的input value放入cate
  const handleChecked = (e) => {
    let value = e.target.value;
    

    if (!cate.includes(value)) {
      setCate([...cate, value]);
    }

    if (cate.includes(value)) {
      const newCate = cate.filter((v) => v !== value);

      setCate(newCate);
      console.log("Cate", newCate);
    }
  };




  return (
    <>
      <div className="aside sticky-top">
        <h2 className="filterbar">商品分類</h2>
        <label className="sidenav">環保餐具</label>
        {productcate.map((product) => {
          const value = product.item;
          return (
            <ul className="filter1">
              <li>
                <div>
                  <input
                    type="checkbox"
                    value={value}
                    checked={cate.includes(value)}
                    onChange={handleChecked}
                  />
                  <label>{value}</label>
                </div>
              </li>
            </ul>
          );
        })}
      <label className="sidenav">環保家具</label>
      {productcate2.map((product2) => {
          const value = product2.item;
          return (
            <ul className="filter1">
              <li>
                <div>
                  <input
                    type="checkbox"
                    value={value}
                    checked={cate.includes(value)}
                    onChange={handleChecked}
                  />
                  <label>{value}</label>
                </div>
              </li>
            </ul>
          );
        })}
        <label className="sidenav">露營裝備</label>
        {productcate3.map((product3) => {
          const value = product3.item;
          return (
            <ul className="filter1">
              <li>
                <div>
                  <input
                    type="checkbox"
                    value={value}
                    checked={cate.includes(value)}
                    onChange={handleChecked}
                  />
                  <label>{value}</label>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default PFilterbar;
