import Logo from "../img/loing.png";
import Facebook from "../img/Facebook.png";
import Google from "../img/Google.png";
import { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
// import { useAuth } from "../context/auth";

import "../style/login.css";

const Login = () => {
  const [error, setError] = useState("1");
  // const { member, setMember } = useAuth();
  const [loginMember, setLoginMember] = useState({
    user_name: "",
    password: "",
    error: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    user_name: "",
    password: "",
    error: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    // 預設值為輸入值
    let newValue = value;

    // 1. 從原本的狀態物件上拷貝出一個新物件
    // 2. 在拷貝的新物件上處理

    const updatedFields = { ...loginMember, [name]: newValue };

    // 3. 設定回狀態
    setLoginMember(updatedFields);
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
      error: "",
    };

    // 3. 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };

  async function login(e) {
    e.preventDefault(); // prevent form refresh

    try {
      let response = await axios.post(
        "http://localhost:3002/login",
        loginMember,
        { withCredentials: true }
      );
      alert("登入成功");
      console.log(response.data.data);

      // setMember(response.data.data);
      setIsLogin(true);
    } catch (e) {
      //console.log(e.response.data.error)
      console.log("2", e.response.data.msg);

      if (e.response.data.msg === "帳號或密碼錯誤") {
        console.log(Number(error));
        //console.log(errTime)
        const updatedFieldErrors = {
          ...fieldErrors,
          error: `帳號或密碼錯誤${error}次`,
        };

        // 3. 設定回錯誤訊息狀態
        setFieldErrors(updatedFieldErrors);
        setError(Number(error) + 1);
      }
      return;
    }
  }
  if (isLogin) {
    // 轉頁效果
    return <Navigate to="/member" />;
  }
  if (Number(error) > 4) {
    alert("失敗次數過多");
    return <Navigate to="/Forgotpw" />;
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
              <h1 className="loginh1 loginh1 d-inline-block ">登入</h1>
              <div className="d-inline-block box">
                <Link className="loginbtn1 userlogin" to="/login">
                  一般會員
                </Link>
                <Link className="loginbtn2" to="/camplogin">
                  營主
                </Link>
              </div>

              <form
                onSubmit={login}
                onInvalid={handleFormInvalid}
                onChange={handleFormChange}
              >
                <div class="form-group">
                  <label for="user_name">帳號</label>
                  <input
                    type="email"
                    class="form-control inputStyle"
                    id="user_name"
                    name="user_name"
                    value={loginMember.user_name}
                    onChange={handleChange}
                    placeholder="請輸入帳號"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.user_name !== "" && (
                    <div className="error text-danger">
                      {fieldErrors.user_name}
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label for="password">密碼</label>
                  <input
                    type="password"
                    class="form-control inputStyle"
                    id="password"
                    name="password"
                    value={loginMember.password}
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

                  <div className="err">
                    {" "}
                    {/* 如果有錯誤訊息，呈現出來 */}
                    {fieldErrors.error !== "" && (
                      <div className="error text-danger">
                        {fieldErrors.error}
                      </div>
                    )}
                  </div>
                </div>

                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input logincheck" />
                  <label
                    class="form-check-label loginlabel"
                    for="exampleCheck1"
                  >
                    記住我
                  </label>

                  <Link className="loginlink1" to="/Forgotpw">
                    忘記密碼
                  </Link>
                </div>

                <br />

                <div className="">
                  <button class="loginbtn3" type="submit">
                    登入
                  </button>
                </div>
                <div>
                  <div className="loginOtheraccount1">以其他帳號登入</div>
                  <br />
                  <br />
                  <div className="d-flex loginPic">
                    <a href="http://google.com">
                      <img src={Google} className="p-3" />
                    </a>
                    <a href="http://facebook.com">
                      <img src={Facebook} className="p-3" />
                    </a>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className="loginMoveLink2">
                    還沒有帳號嗎? &nbsp;&nbsp;
                    <Link className="loginlink2" to="/signupuser">
                      註冊
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
