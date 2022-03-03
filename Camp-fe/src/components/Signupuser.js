import Signup from "../img/login2.png";
import "../style/register.css";
import Facebook from "../img/Facebook.png";
import Google from "../img/Google.png";
import { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import moment from "moment";

const Signupuser = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupMember, setSignupmember] = useState({
    name: "",
    user_name: "",
    phone: "",
    date: "",
    password: "",
    confirmPassword: "",
    gender: "1",
    created_time: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    user_name: "",
    phone: "",
    date: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    // 預設值為輸入值
    let newValue = value;

    // 1. 從原本的狀態物件上拷貝出一個新物件
    // 2. 在拷貝的新物件上處理

   
    const updatedFields = { ...signupMember, [name]: newValue };

    // 3. 設定回狀態
    setSignupmember(updatedFields);
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
    // 阻擋form的預設送出行為
    e.preventDefault();

    // 利用 FormData 獲取各欄位的值(另一種得到表單值的方式)
    // 注意：FormData 是利用各欄位的 name 屬性
    const formData = new FormData(e.target);
    // console.log(formData.get("name"));
    // console.log(formData.get("user_name"));
    // console.log(formData.get("phone"));
    // console.log(formData.get("password"));
    // console.log(formData.get("gender"));
    // console.log(formData.get("confirmPassword"));

    

    // 作客製化驗証
    if (formData.get("password") !== formData.get("confirmPassword")) {
      //設定錯誤的訊息
      const updatedFieldErrors = {
        ...fieldErrors,
        password: "密碼與確認密碼欄位輸入值不相同",
        confirmPassword: "密碼與確認密碼欄位輸入值不相同",
      };
      const signupMemberErrors = {
        ...signupMember,
        password: "",
        confirmPassword: "",
      };

      // 3. 設定回錯誤訊息狀態
      setFieldErrors(updatedFieldErrors);
      setSignupmember(signupMemberErrors);
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
      const signupMemberErrors = {
        ...signupMember,
        password: "",
        confirmPassword: "",
      };
      setFieldErrors(updatedFieldErrors);
      setSignupmember(signupMemberErrors);
    }

    // 驗証成功，ajax送到伺服器
    try {
      let response = await axios.post(
        "http://localhost:3002/signupuser",
        signupMember
      );

      alert("註冊成功!");
      setIsSignup(true);
    } catch (e) {
      console.log(e.response.data.error);
      if (e.response.data.error === "此信箱已註冊") {
        const updatedFieldErrors = {
          ...fieldErrors,
          user_name: "此信箱已註冊",
        };
        setFieldErrors(updatedFieldErrors);
      }
    }
  }



  if (isSignup) {
    // 轉頁效果
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container-fulid">
        <div className="">
          <div className="Signup">
            <img src={Signup} className="Signuppic" />
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
              <div className="row test">
                <div class="col-6 position-relative">
                  <label for="name">姓名</label>
                  <input
                    type="text"
                    class="form-control Signupinput"
                    id="name"
                    name="name"
                    value={signupMember.name}
                    onChange={handleChange}
                    placeholder="請輸入姓名"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.name !== "" && (
                    <div className="error text-danger">{fieldErrors.name}</div>
                  )}
                </div>

                <div class="col-6 test">
                  <label for="user_name">帳號</label>
                  <input
                    type="email"
                    class="form-control Signupinput"
                    id="user_name"
                    name="user_name"
                    value={signupMember.user_name}
                    onChange={handleChange}
                    placeholder="請輸入帳號"
                    required
                  />
                  {fieldErrors.user_name !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.user_name}
                    </div>
                  )}
                </div>

                <div class="col-6 test">
                  <label for="phone">手機</label>
                  <input
                    type="tel"
                    class="form-control Signupinput"
                    id="phone"
                    name="phone"
                    value={signupMember.phone}
                    onChange={handleChange}
                    placeholder="請輸入手機號碼"
                    required
                  />
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
                    value={signupMember.password}
                    onChange={handleChange}
                    placeholder="請輸入密碼"
                    required
                  />
                  {fieldErrors.password !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.password}
                    </div>
                  )}
                </div>

                <div class="col-6">
                  <label for="date">出生日期</label>
                  <input
                    type="date"
                    class="form-control Signupinput"
                    id="date"
                    name="date"
                    value={signupMember.date}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.date !== "" && (
                    <div className="error text-danger">{fieldErrors.date}</div>
                  )}
                </div>

                <div class="col-6 ">
                  <label for="password">確認密碼</label>
                  <input
                    type="password"
                    class="form-control Signupinput"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={signupMember.confirmPassword}
                    onChange={handleChange}
                    placeholder="請再次輸入密碼"
                    required
                  />
                  {fieldErrors.confirmPassword !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="moveSex">性別</label>
              </div>

              <div class="form-check form-check-inline  moveCheck">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  value="1"
                  onChange={handleChange}
                  checked
                />

                <label class="form-check-label" for="exampleCheck1">
                  男
                </label>
              </div>
              <div class="form-check form-check-inline moveCheck">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  value="0"
                  onChange={handleChange}
                />

                <label class="form-check-label" for="exampleCheck1">
                  女
                </label>
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="SignupOtheraccount">以其他帳號登入</div>

                  <div className="d-flex Signupimg">
                    <a href="http://google.com">
                      <img src={Google} className="p-3" />
                    </a>
                    <a href="http://facebook.com">
                      <img src={Facebook} className="p-3" />
                    </a>
                  </div>
                </div>

                <div className="col-6">
                  <button type="submit" class="btn3">
                    註冊
                  </button>
                  <div className="moveLink">
                    已經有帳號了? &nbsp;&nbsp;
                    <Link className="loginlink2" to="/login">
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
export default Signupuser;
