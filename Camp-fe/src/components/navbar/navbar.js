import { Link, NavLink } from "react-router-dom";
import Logo from "../../img/logo1.svg";
import Search from "../../img/Vector.png";
import Cart from "../../img/shopping-cart.svg";

// import "../../style/Global.scss";
import "../../style/Navbar.scss";

import { useAuth } from "../../auth/auth";
import axios from "axios";

function Navbar() {
  const { member, setMember } = useAuth();
  const { campmember, setCampMember } = useAuth();

  const handleLogout = async () => {
    await axios.get("http://localhost:3002/logout", {
      withCredentials: true,
    });
    setMember(null);
    setCampMember(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-success p-3">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand nav-logo" to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <form className="form-inline d-flex mr-5">
            <div class="logo ml-2">
              <img src={Search} alt="Logo" />
            </div>
            <input
              className="form-control ml-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/camplist"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                營區瀏覽
              </NavLink>
              <div className="dropdown-menu menu" role="menu">
                <div className="d-flex">
                  <ul>
                    <Link className="dropdown-item" to="#">
                      露營設備
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">
                     露營車
                    </Link>
                    <Link className="dropdown-item" to="#">
                     鐘形帳篷
                    </Link>
                    <Link className="dropdown-item" to="#">
                      蒙古包
                    </Link>
                    <Link className="dropdown-item" to="#">
                      狩獵帳
                    </Link>
                   
                  </ul>
                  <ul>
                    <Link className="dropdown-item" to="#">
                      環境特色
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">
                      山間秘境
                    </Link>
                    <Link className="dropdown-item" to="#">
                      自然森林
                    </Link>
                    <Link className="dropdown-item" to="#">
                      溪邊戲水
                    </Link>
                    <Link className="dropdown-item" to="#">
                      蔚藍海景
                    </Link>
                    <Link className="dropdown-item" to="#">
                      浪漫夜景
                    </Link>
                    <Link className="dropdown-item" to="#">
                      仙境雲海
                    </Link>
                    <Link className="dropdown-item" to="#">
                     賞花海景
                    </Link>
                  </ul>
                  <ul>
                    <Link className="dropdown-item" to="#">
                      區域
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">
                     北區
                    </Link>
                    <Link className="dropdown-item" to="#">
                      中區
                    </Link>
                    <Link className="dropdown-item" to="#">
                      南區
                    </Link>
                    <Link className="dropdown-item" to="#">
                      東區
                    </Link>
                   
                  </ul>
                 
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/products"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                商品瀏覽
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">
                  環保餐具
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">
                  水壺
                </Link>
                <Link className="dropdown-item" to="#">
                  餐具組
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                活動總覽
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">
                  回收活動
                </Link>
                <Link className="dropdown-item" to="#">
                  促銷活動
                </Link>
              </div>
            </li>
            <li>
              <img src={Cart} alt="shopping-cart" />
            </li>
            {member == null && campmember == null  && (
              <>
                <li>
                  <button className="btn btn-outline-danger ml-2" type="submit">
                    <Link to="/login">登入</Link>
                  </button>
                </li>
              </>
            )}

            {member && (
              <>
                <li>
                  <button className="btn ml-2" type="submit">
                    <a href="http://localhost:8000">會員中心</a>
                  </button>
                </li>
                <li>
                  <button className="btn btn-outline-danger ml-2" type="submit">
                    <Link to="/login" onClick={handleLogout}>
                      登出
                    </Link>
                  </button>
                </li>
              </>
            )}
            {campmember && (
              <>
                <li>
                  <button className="btn ml-2" type="submit">
                    <a href="http://localhost:9000/">營主會員中心</a>
                  </button>
                </li>
                <li>
                  <button className="btn btn-outline-danger ml-2" type="submit">
                    <Link to="/login" onClick={handleLogout}>
                      登出
                    </Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
