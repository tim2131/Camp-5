import Signup from "../img/login2.png";
import "../style/register.css";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Navigate, Link } from "react-router-dom";

const Signupcamp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupCamper, setSignupcamper] = useState({
    company_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    created_time: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  const [fieldErrors, setFieldErrors] = useState({
    company_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // const type = e.target.type;

    // 預設值為輸入值
    let newValue = value;

    // 1. 從原本的狀態物件上拷貝出一個新物件
    // 2. 在拷貝的新物件上處理

    const updatedFields = { ...signupCamper, [name]: newValue };

    // 3. 設定回狀態
    setSignupcamper(updatedFields);
  }
  // 當表單檢查有不合法的訊息時會呼叫
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
  // 當整個表單有更動時會觸發
  // 認定使用者輸入某個欄位(更正某個有錯誤的欄位)
  // 清空某個欄位錯誤訊息
  const handleFormChange = (e) => {
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: "",
    };

    // 3. 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };

  async function submit(e) {
    e.preventDefault();

    // 利用 FormData 獲取各欄位的值(另一種得到表單值的方式)
    // 注意：FormData 是利用各欄位的 name 屬性
    const formData = new FormData(e.target);
    // console.log(formData.get("company_name"));
    // console.log(formData.get("email"));
    // console.log(formData.get("phone"));
    // console.log(formData.get("password"));
    // console.log(formData.get("address"));
    // console.log(formData.get("confirmPassword"));

    // 作客製化驗証
    if (formData.get("password") !== formData.get("confirmPassword")) {
      //設定錯誤的訊息
      const updatedFieldErrors = {
        ...fieldErrors,
        password: "密碼與確認密碼欄位輸入值不相同",
        confirmPassword: "密碼與確認密碼欄位輸入值不相同",
      };
      const signupCamperErrors = {
        ...signupCamper,
        password: "",
        confirmPassword: "",
      };

      // 3. 設定回錯誤訊息狀態
      setFieldErrors(updatedFieldErrors);
      setSignupcamper(signupCamperErrors);
    } else if (
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
        confirmPassword:
          "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位",
      };
      const signupCamperErrors = {
        ...signupCamper,
        password: "",
        confirmPassword: "",
      };
      setFieldErrors(updatedFieldErrors);
      setSignupcamper(signupCamperErrors);
    }

    try {
      let response = await axios.post(
        "http://localhost:3002/signupcamp",
        signupCamper
      );

      alert("註冊成功!");
      setIsSignup(true);
    } catch (e) {
      console.log(e.response.data.error);
      if (e.response.data.error === "此信箱已註冊") {
        const updatedFieldErrors = {
          ...fieldErrors,
          email: "此信箱已註冊",
        };
        setFieldErrors(updatedFieldErrors);
      }
    }
  }
  if (isSignup) {
    // 轉頁效果
    return <Navigate to="/camplogin" />;
  }
  return (
    <>
      <div className="container-fulid">
        <div className="">
          <div className="Signup">
            <img src={Signup} className="pic" />
          </div>
          <br />
          <br />
          <br />
          <div>
            <h1 className="h1 d-inline-block Signuph1">註冊</h1>
            <div className="d-inline-block Signupbox">
              <Link className="Signupbtn1" to="/signupuser">
                一般會員
              </Link>
              <Link className="Signupbtn2" to="/signupcamp">
                營主
              </Link>
            </div>

            <form
              onSubmit={submit}
              onInvalid={handleFormInvalid}
              onChange={handleFormChange}
            >
              <div className="row">
                <div class="col-6 test">
                  <label for="company_name">營地名稱</label>
                  <input
                    type="text"
                    class="form-control Signupinput"
                    id="company_name"
                    name="company_name"
                    value={signupCamper.company_name}
                    onChange={handleChange}
                    placeholder="請輸入營地名稱"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.company_name !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.company_name}
                    </div>
                  )}
                </div>

                <div class="col-6 test">
                  <label for="email">帳號</label>
                  <input
                    type="email"
                    class="form-control Signupinput"
                    id="email"
                    name="email"
                    value={signupCamper.email}
                    onChange={handleChange}
                    placeholder="請輸入信箱"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.email !== "" && (
                    <div className="error text-danger">{fieldErrors.email}</div>
                  )}
                </div>

                <div class="col-6 test">
                  <label for="phone">營地電話</label>
                  <input
                    type="tel"
                    class="form-control Signupinput"
                    id="phone"
                    name="phone"
                    value={signupCamper.phone}
                    onChange={handleChange}
                    placeholder="請輸入營地電話"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.phone !== "" && (
                    <div className="error text-danger">{fieldErrors.phone}</div>
                  )}
                </div>

                <div class="col-6 test">
                  <label for="password">密碼</label>
                  <input
                    type="password"
                    class="form-control Signupinput"
                    id="password"
                    name="password"
                    value={signupCamper.password}
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

                <div class="col-6 test">
                  <label for="address">營地地址</label>
                  <input
                    type="text"
                    class="form-control Signupinput"
                    id="address"
                    name="address"
                    value={signupCamper.address}
                    onChange={handleChange}
                    placeholder="請輸入營地地址"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.address !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.address}
                    </div>
                  )}
                </div>

                <div class="col-6">
                  <label for="password">確認密碼</label>
                  <input
                    type="password"
                    class="form-control Signupinput"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={signupCamper.confirmPassword}
                    onChange={handleChange}
                    placeholder="請再次輸入密碼"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.confirmPassword !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <div className="col-6"></div>

                <div className="col-6">
                  <button type="submit" class="btn3">
                    註冊
                  </button>
                  <div className="moveLink">
                    已經有帳號了? &nbsp;&nbsp;
                    <Link className="loginlink2" to="/camplogin">
                      登入
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signupcamp;
