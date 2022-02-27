import "../style/camplist.css";
import React from "react";

const Filterbar = (props) => {
  const {
    cate,
    cate2,
    cate3,
    tentdata,
    countydata,
    catedata,
    setCate3,
    setCate,
    setCate2,
    region1data,
    region2data,
    region3data,
    region4data,
  } = props;

  //帳篷分類 勾選的input value放入cate3
  const handleChecked3 = (e) => {
    let value = e.target.value;

    if (!cate3.includes(value)) {
      setCate3([...cate3, value]);
    }

    if (cate3.includes(value)) {
      const newCate = cate3.filter((v) => v !== value);

      setCate3(newCate);
    }
  };

  //地點分類 勾選的input value放入cate2
  const handleChecked2 = (e) => {
    let value = e.target.value;
    //  console.log(value);
    // console.log(cate2.includes(value));
    if (!cate2.includes(value)) {
      setCate2([...cate2, value]);
    }

    if (cate2.includes(value)) {
      const newCate = cate2.filter((v) => v !== value);

      setCate2(newCate);
    }
  };

  //環境分類功能  勾選的input value放入cate
  const handleChecked = (e) => {
    let value = e.target.value;
    // console.log(value);
    //console.log(cate.includes(value));
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
        <h2 className="filterbar">營地分類</h2>
        <label className="sidenav">露營設備</label>

        {tentdata.map((tent) => {
          const value = tent.tent_item;
          return (
            <ul className="filter1">
              <li>
                <div>
                  <input
                    type="checkbox"
                    value={value}
                    checked={cate3.includes(value)}
                    onChange={handleChecked3}
                  />
                  <label>{value}</label>
                </div>
              </li>
            </ul>
          );
        })}
        <label className="sidenav">營地環境</label>
        {catedata.map((campCate) => {
          const value = campCate.camp_item;
          return (
            <ul className="filter2">
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

        <label className="sidenav">營地地點</label>

        <div class="dropright dropdowncolor">
          <button
            class="btn dropdown-toggle dropdownBtncolor"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            北區
          </button>
          <div
            class="dropdown-menu menucolor"
            aria-labelledby="dropdownMenuButton"
          >
            {region1data.map((region1) => {
              const value = region1.camp_county;

              return (
                <ul className="filter3">
                  <li>
                    <div>
                      <input
                        type="checkbox"
                        value={value}
                        checked={cate2.includes(value)}
                        onChange={handleChecked2}
                      />
                      <label>{value}</label>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div class="dropright dropdowncolor">
          <button
            class="btn dropdown-toggle dropdownBtncolor"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            中區
          </button>
          <div
            class="dropdown-menu menucolor"
            aria-labelledby="dropdownMenuButton"
          >
            {region2data.map((region2) => {
              const value = region2.camp_county;

              return (
                <ul className="filter3">
                  <li>
                    <div>
                      <input
                        type="checkbox"
                        value={value}
                        checked={cate2.includes(value)}
                        onChange={handleChecked2}
                      />
                      <label>{value}</label>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div class="dropright dropdowncolor">
          <button
            class="btn dropdown-toggle dropdownBtncolor"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            南區
          </button>
          <div
            class="dropdown-menu menucolor"
            aria-labelledby="dropdownMenuButton"
          >
            {region3data.map((region3) => {
              const value = region3.camp_county;

              return (
                <ul className="filter3">
                  <li>
                    <div>
                      <input
                        type="checkbox"
                        value={value}
                        checked={cate2.includes(value)}
                        onChange={handleChecked2}
                      />
                      <label>{value}</label>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div class="dropright dropdowncolor">
          <button
            class="btn dropdown-toggle dropdownBtncolor"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            東區
          </button>
          <div
            class="dropdown-menu menucolor"
            aria-labelledby="dropdownMenuButton"
          >
            {region4data.map((region4) => {
              const value = region4.camp_county;

              return (
                <ul className="filter3">
                  <li>
                    <div>
                      <input
                        type="checkbox"
                        value={value}
                        checked={cate2.includes(value)}
                        onChange={handleChecked2}
                      />
                      <label>{value}</label>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Filterbar;
