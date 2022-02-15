import React, { useState, useEffect } from 'react';
import '../style/Footer.scss';

// 圖片
import footer from '../img/background/footer.svg';
import youtube from '../img/icon/youtube.svg';
import instagram from '../img/icon/instagram.svg';
import facebook from '../img/icon/facebook.svg';
import goToTop from '../img/icon/go-to-top.svg';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="footer">
        <img src={footer} alt="" className="footer-bg" />
        <div className="footer-bg2"></div>
        <div className="footer-content">
          <div className="footer-icon d-flex justify-content-between">
            <a href="#">
              <img src={youtube} alt="" />
            </a>
            <a href="#">
              <img src={instagram} alt="" />
            </a>
            <a href="#">
              <img src={facebook} alt="" />
            </a>
          </div>
          <div className="footer-link">
            <a href="#">關於森活營家</a>
            <a href="#">服務條款</a>
            <a href="#">廣告洽談</a>
            <a href="#">聯絡我們</a>
          </div>
          <div className="footer-name text-center">
            © 2021 森活營家，版權所有。
          </div>
        </div>
        <button className="go-to-top" onClick={scrollToTop}>
          <img src={goToTop} alt="" />
        </button>
      </div>
    </>
  );
}

export default Footer;
