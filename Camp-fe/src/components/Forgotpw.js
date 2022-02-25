
import React, { Component } from "react";

import axios from "axios";
import Logo from "../img/loing.png";
import "../style/login.css";



class Forgotpw extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //   handleChange = (name) => (event) => {
  //     this.setState({
  //       [name]: event.target.value,
  //     });
  //   };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3002/forgotPassword",
          {
            email,
          }
        );
        console.log(response.data);
        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false,
          });
          alert("已寄到信箱")
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

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
              <form onSubmit={this.sendEmail}>
          <div class="form-group">
            <label for="exampleInputEmail1">電子信箱</label>
            <input
              type="email"
              class="form-control Signupinput"
              id="exampleInputEmail1"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              aria-describedby="emailHelp"
              placeholder="請輸入信箱"
              required
            />
          </div>

          <button type="submit" class="btn4">
           送出
          </button>
        </form>
              
            </div>
          </div>
        </div>
      </div></>
    );
  }
}

export default Forgotpw;
