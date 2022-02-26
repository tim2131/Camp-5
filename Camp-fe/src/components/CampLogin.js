import Logo from "../img/loing.png";
import { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
// import { useAuth } from "../context/auth";
import "../style/login.css";
import { useCookies } from "react-cookie";

const CampLogin = () => {
  // ASK:
  const [cookies, setCookie] = useCookies(["connect.sid"]);
  console.log("connect.sid", cookies);
  let cookieQuery = cookies["connect.sid"];
  console.log("cookieQuery", cookieQuery);
  // const cookieQuery = cookies.connect.sid;

  const [error, setError] = useState("1");
  // const { member, setMember } = useAuth();
  const [loginMember, setLoginMember] = useState({
    email: "dddd@test.com",
    password: "Dddd1231",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
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
        "http://localhost:3002/camplogin",
        loginMember,
        { withCredentials: true }
      );
      alert("登入成功");
      console.log(response.data);
      // setMember(response.data.data);
      setIsLogin(true);
    } catch (e) {
      //console.log(e.response.data.error)
      console.log("2", e);
      if (e.response.data.error === "帳號或密碼錯誤") {
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
    }
  }
  if (isLogin) {
    // 轉頁效果
    //TODO: 夾帶cookie
    //ASK: 為什麼customer不會跳轉
    return (window.location = `http://localhost:8000?SID=${cookieQuery}`);
  }
  if (Number(error) > 4) {
    alert("失敗次數過多");
    return <Navigate to="/Forgotpw" />;
  }

  return (
    <>
      <div className="container-fulid">
        <div className="camplogin">
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
                <Link className="loginbtn1" to="/login">
                  一般會員
                </Link>
                <Link className="loginbtn2 camploginbtn" to="/camplogin">
                  營主
                </Link>
              </div>

              <form
                onSubmit={login}
                onInvalid={handleFormInvalid}
                onChange={handleFormChange}
              >
                <div class="form-group">
                  <label for="">帳號</label>
                  <input
                    type="email"
                    class="form-control CampinputStyle"
                    id="email"
                    name="email"
                    value={loginMember.email}
                    onChange={handleChange}
                    placeholder="請輸入帳號"
                    required
                  />
                  {/* 如果有錯誤訊息，呈現出來 */}
                  {fieldErrors.email !== "" && (
                    <div className="error text-danger">{fieldErrors.email}</div>
                  )}
                </div>
                <div class="form-group">
                  <label for="password">密碼</label>
                  <input
                    type="password"
                    class="form-control CampinputStyle"
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
                  <button class="loginbtn3">登入</button>
                </div>
                <div>
                  <div className="loginMoveLink2">
                    還沒有帳號嗎? &nbsp;&nbsp;
                    <Link className="loginlink2" to="/signupcamp">
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

export default CampLogin;
