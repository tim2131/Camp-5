import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";
// Import css files
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "../style/PicSlider.scss";
// import { baseUrl } from "./config";

function PicSlider() {
  const settings = {
    dots: true,
    dotsClass: "slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div>
          <div className="campS">
            <img
              className="campSSty"
              src={`http://localhost:3002/camp-pic/img/camp${i + 1}.jpg`}
              alt=""
            />
          </div>
        </div>
      );
    },
  };

  const [data, setData] = useState([]);
  const { campId } = useParams();
  useEffect(() => {
    let getCamp = async () => {
      let response = await axios.get(
        `http://localhost:3002/api/camp/${campId}`
      );

      setData(response.data);
    };
    getCamp();
  }, []);

  return (
    <>
      {data.map((item) => {
        return (
          <>
            <div>
              <Slider {...settings}>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img1}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img2}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img3}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img4}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img5}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img6}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img7}`}
                    alt=""
                  />
                </div>
                <div className="campL">
                  <img
                    className="campLSty polygon"
                    src={`http://localhost:3002/camp-pic/img/${item.img8}`}
                    alt=""
                  />
                </div>
              </Slider>
            </div>
          </>
        );
      })}
    </>
  );
}

export default PicSlider;
