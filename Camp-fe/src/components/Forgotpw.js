import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Logo from "../img/loing.png";
import "../style/login.css";

const Forgotpw = () => {
  const [useremail, setUseremail] = useState({
    email: "",
  });
  const [isSend, setIsSend] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUseremail({ ...useremail, [name]: value });
  }

  async function sendEmail(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3002/forgotPassword",
        useremail
      );
      setIsSend(true);
      alert("已寄到信箱");
    } catch (error) {
      console.error("錯誤", error.response.data.msg);
      if (error.response.data.msg === "此信箱未註冊") {
        alert("此信箱未註冊");
      }
    }
  }

  if (isSend) {
    // 轉頁效果
    return <Navigate to="/code" />;
  }

  return (
    <>
      <div className="container-fulid">
        <div className="login">
          <div className="loginLogo">
            <img src={Logo} className="loginimg" />
          </div>

          <div>
            <br />
            <br />
            <br />
            <div>
              <h1 className="h1 loginh1 d-inline-block ">忘記密碼</h1>
              {/* <div className="d-inline-block box">
                <Link className="loginbtn1" to="/login">
                  一般會員
                </Link>
                <Link className="loginbtn2" to="/camplogin">
                  營主
                </Link>
              </div> */}
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">電子信箱</label>
                  <input
                    type="email"
                    class="form-control Signupinput"
                    id="exampleInputEmail1"
                    name="email"
                    value={useremail.email}
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    placeholder="請輸入信箱"
                    required
                  />
                </div>

                <button class="btn4" onClick={sendEmail}>
                  送出
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpw;
