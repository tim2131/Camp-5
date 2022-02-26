import { Link, NavLink } from "react-router-dom";
import Logo from "../../img/logo1.svg";
import Search from "../../img/Vector.png";
import Cart from "../../img/shopping-cart.svg";

// import "../../style/Global.scss";
import "../../style/Navbar.scss";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-success p-3">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand nav-logo" to="#">
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
                      狩獵帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      TEE PEE
                    </Link>
                    <Link className="dropdown-item" to="#">
                      露營車
                    </Link>
                    <Link className="dropdown-item" to="#">
                      星空帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      泡泡帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      鐘型帳
                    </Link>
                  </ul>
                  <ul>
                    <Link className="dropdown-item" to="#">
                      露營設備
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">
                      狩獵帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      TEE PEE
                    </Link>
                    <Link className="dropdown-item" to="#">
                      露營車
                    </Link>
                    <Link className="dropdown-item" to="#">
                      星空帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      泡泡帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      鐘型帳
                    </Link>
                  </ul>
                  <ul>
                    <Link className="dropdown-item" to="#">
                      露營設備
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">
                      狩獵帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      TEE PEE
                    </Link>
                    <Link className="dropdown-item" to="#">
                      露營車
                    </Link>
                    <Link className="dropdown-item" to="#">
                      星空帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      泡泡帳
                    </Link>
                    <Link className="dropdown-item" to="#">
                      鐘型帳
                    </Link>
                  </ul>
                </div>
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
            <li>
              <button className="btn btn-outline-danger ml-2" type="submit">
                <Link to="/login">登入</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
