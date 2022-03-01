  import React from "react";
  import {  useEffect } from "react";
  import "../style/dashBoardMember.less";
  import axios from "axios";
  
  
  
  const LogStatus= ({logData ,setLogData}) => {
  // -------------------------------------------------
  
  
  async function getmember(e) {
    try {
      let result = await axios.get("http://localhost:3005/api/login", {
        withCredentials: true,
      });
      console.log("frontend result",result.data);
      setLogData(result.data);
    } catch (e) {
      console.error("錯誤");
      // return alert("您尚未登入，請登入後繼續") (window.location = `http://localhost:3000/login`)
      window.alert("您尚未登入，請登入後繼續");
      window.location.href = "http://localhost:3000/login";
    }
  }
  useEffect(() => {
    getmember();
  }, []);
  console.log(logData);
  
  //--------------------------------
    
    return (
      <>
    
       
      </>
    );
  };
  
  export default LogStatus;
  