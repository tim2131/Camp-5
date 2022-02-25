
import "../style/camplist.css";
import React from "react";
import { Link } from "react-router-dom";




const Pagination = (props) => {

    const{currentPage,postsPerPage,showdata,setCurrentPage} =props
    




//分辨有多少頁碼
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(showdata.length / postsPerPage); i++) {
  pageNumbers.push(i);
}
//換頁funtioon
const paginate = (pageNumber) => setCurrentPage(pageNumber);
 

    return(
        <>
             <nav className="page">
            <ul className="d-flex">
              {pageNumbers.map((number) => {
                return (
                  <li key={number}>
                    <Link
                      onClick={() => paginate(number)}
                      to=""
                      className="pagenumber"
                    >
                      {number}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
    )



}

export default Pagination