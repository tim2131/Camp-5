import { Link, NavLink } from "react-router-dom";
import Logo from "../../img/logo1.svg";
import "../../style/navbar.scss"

function Navbar() {
    return (
        <>
<nav className="navbar navbar-expand-sm navbar-success p-3">
<Link className="navbar-brand nav-logo" href="#">
  <Logo />
</Link>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <form className="form-inline">
    <input
      type="img"
      src="img/search.svg"
      onclick="submit()"
    />
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
        href="#"
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
            <Link className="dropdown-item" href="#">露營設備</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" href="#">狩獵帳</Link>
            <Link className="dropdown-item" href="#">TEE PEE</Link>
            <Link className="dropdown-item" href="#">露營車</Link>
            <Link className="dropdown-item" href="#">星空帳</Link>
            <Link className="dropdown-item" href="#">泡泡帳</Link>
            <Link className="dropdown-item" href="#">鐘型帳</Link>
          </ul>
          <ul>
            <Link className="dropdown-item" href="#">露營設備</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" href="#">狩獵帳</Link>
            <Link className="dropdown-item" href="#">TEE PEE</Link>
            <Link className="dropdown-item" href="#">露營車</Link>
            <Link className="dropdown-item" href="#">星空帳</Link>
            <Link className="dropdown-item" href="#">泡泡帳</Link>
            <Link className="dropdown-item" href="#">鐘型帳</Link>
          </ul>
          <ul>
            <Link className="dropdown-item" href="#">露營設備</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" href="#">狩獵帳</Link>
            <Link className="dropdown-item" href="#">TEE PEE</Link>
            <Link className="dropdown-item" href="#">露營車</Link>
            <Link className="dropdown-item" href="#">星空帳</Link>
            <Link className="dropdown-item" href="#">泡泡帳</Link>
            <Link className="dropdown-item" href="#">鐘型帳</Link>
          </ul>
        </div>
      </div>
    </li>
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        商品瀏覽
      </NavLink>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link className="dropdown-item" href="#">環保餐具</Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" href="#">水壺</Link>
        <Link className="dropdown-item" href="#">餐具組</Link>
      </div>
    </li>
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        活動總覽
      </NavLink>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link className="dropdown-item" href="#">回收活動</Link>
        <Link className="dropdown-item" href="#">促銷活動</Link>
      </div>
    </li>
    <li>
      <input
        type="img"
        src="img/shopping-cart.svg"
        onclick="submit()"
      />
    </li>
    <li>
      <button className="btn btn-outline-danger ml-2" type="submit">
        登入
      </button>
    </li>
  </ul>
</div>
</nav>
</>
    )
}

export default Navbar;