import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "./useCart";

function TentSelect() {
  const { cart, items, plusOne, minusOne, removeItem } = useCart();
  const [tentdata, setTentData] = useState([]);
  const { campId } = useParams();

  useEffect(() => {
    let getCamp = async () => {
      let response1 = await axios.get(
        `http://localhost:3002/api/tentcate/${campId}`
      );

      setTentData(response1.data);
    };
    getCamp();
  }, []);
  useEffect(() => {
    localStorage.setItem("myTent", JSON.stringify(tentdata));
  }, [tentdata]);
  useEffect(() => {
    let b = JSON.parse(localStorage.getItem("myTent"));
    console.log(b);
    console.log(localStorage.key(0));
  }, []);
  return (
    <>
      {items.map((v, i) => {
        return (
          <div className="tentBlockA row" key={v.id}>
            <div className="col-2">
              <div className="tentSmall">
                <img
                  className="tentSmallPic"
                  src={`http://localhost:3002/tent-pic/img/${v.img}`}
                  alt=""
                />
              </div>
            </div>
            <div className="col-1 align-self-center">
              <div>
                <h5>{v.tent_item}</h5>
              </div>
            </div>
            <div className="col-3 align-self-center">
              <div>
                <h3>{v.tent_item}</h3>
              </div>
            </div>
            <div className="tentTextBlock col-4 align-self-center">
              <div className="d-flex justify-content-center">
                <h5>
                  定價:{v.price}元/帳
                  <br />
                  <br />
                  最大入住人:{v.number}
                </h5>
              </div>
            </div>
            <div className="col-2 align-self-center">
              <div className="count">
                <div className="btn-group mr-2" role="group">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      minusOne(v.id);
                    }}
                  >
                    -
                  </button>
                  <button type="button" className="btn btn-light">
                    {v.quantity}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      plusOne(v.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TentSelect;
