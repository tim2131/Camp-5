import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";
import Logo from "../img/loing.png";
import "../style/login.css";

const InputCode = () => {
  const [usercode, setUsercode] = useState({
    code: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    code: "",
    password: "",
  });
  const [isReset, setIsReset] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let newValue = value;
    const updatedFields = { ...usercode, [name]: newValue };
    setUsercode(updatedFields);
  }

  const handleFormInvalid = (e) => {
    // 阻擋form的預設送出行為(錯誤泡泡訊息)
    e.preventDefault();

    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    };

    // 3. 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };
  const handleFormChange = (e) => {
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: "",
    };

    // 3. 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      !formData
        .get("password")
        .match(
          /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/
        )
    ) {
      const updatedFieldErrors = {
        ...fieldErrors,
        password:
          "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位",
      };
      const usercodeErrors = {
        ...usercode,
        password: "",
      };
      setFieldErrors(updatedFieldErrors);
      setUsercode(usercodeErrors);
    }

    try {
      let response = await axios.post(
        "http://localhost:3002/resetpassword",
        usercode
      );

      setIsReset(true);

      alert("更改成功");
    } catch (error) {
      console.error("錯誤", error.response.data.msg);
      if (error.response.data.msg === "驗證碼錯誤") {
        const updatedFieldErrors = {
          ...fieldErrors,
          code: "驗證碼錯誤",
        };
        setFieldErrors(updatedFieldErrors);
      }
    }
  }

  if (isReset) {
    // 轉頁效果
    return <Navigate to="/login" />;
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
              <h1 className="h1 loginh1 d-inline-block ">更改密碼</h1>
              {/* <div className="d-inline-block box">
                <Link className="loginbtn1" to="/login">
                  一般會員
                </Link>
                <Link className="loginbtn2" to="/camplogin">
                  營主
                </Link>
              </div> */}
              <form
                onSubmit={handleSubmit}
                onInvalid={handleFormInvalid}
                onChange={handleFormChange}
              >
                <div class="form-group">
                  <label for="exampleInputEmail1">驗證碼</label>
                  <input
                    type="text"
                    class="form-control Signupinput"
                    name="code"
                    value={usercode.code}
                    onChange={handleChange}
                    placeholder="請輸入驗證碼"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.code !== "" && (
                    <div className="error text-danger">{fieldErrors.code}</div>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">輸入新密碼</label>
                  <input
                    type="password"
                    class="form-control Signupinput"
                    name="password"
                    value={usercode.password}
                    onChange={handleChange}
                    placeholder="請輸入密碼"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.password !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.password}
                    </div>
                  )}
                </div>
                <button class="btn4">送出</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputCode;
