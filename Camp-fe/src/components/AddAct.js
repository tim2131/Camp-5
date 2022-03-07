import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSecondCart } from "./useSecondCart";

function AddAct() {
  const { campId } = useParams();
  const [actdata, setActData] = useState([]);
  const { cart, items, plusOne, minusOne, removeItem } = useSecondCart();

  useEffect(() => {
    let getAct = async () => {
      let response = await axios.get(`http://localhost:3002/api/act/${campId}`);

      setActData(response.data);
    };
    getAct();
  }, []);
  async function handleSubmit() {
    localStorage.setItem("myAct", JSON.stringify(actdata));
  }
  useEffect(() => {
    localStorage.setItem("myAct", JSON.stringify(actdata));
  }, [actdata]);
  useEffect(() => {
    let c = JSON.parse(localStorage.getItem("myAct"));
    console.log(c);
    console.log(localStorage.key(0));
  }, []);

  return (
    <>
      {items.map((v, i) => {
        return (
          <>
            <div className="addActsBlockA row mb-4">
              <div className="col-4">
                <div className="actsSmall">
                  <img
                    className="actsSmallPic"
                    src={`http://localhost:3002/act-pic/img/${v.pic}`}
                    alt=""
                    style={{ width: "380px", height: "210px" }}
                  />
                </div>
              </div>
              <div className="tentTextBlock col-4 align-self-center">
                <div className="text-align-center">
                  <h3>{v.name}</h3>
                  <h5>{v.intro}</h5>
                </div>
              </div>
              <div className="col-4 align-self-center">
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

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleSubmit}
                >
                  加購
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default AddAct;
