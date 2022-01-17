import React from "react";
import "./GlobalNavBar.css";
import { ReactComponent as SearchIcon } from "../images/icon-search.svg";
import { ReactComponent as AlramIcon } from "../images/icon-alram.svg";
import profile from "../images/profile.jpg";
import menu_icon from "../images/icon-menu.png";

const navItemTitle = [
  "채용",
  "이벤트",
  "직군별 연봉",
  "이력서",
  "커뮤니티",
  "프리랜서",
  "AI 합격예측",
];

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <div className="menu">
        <img src={menu_icon} alt="menu_icon" width="18px" />
      </div>
      <div className="logo">wanted</div>
    </div>
  );
};

const NavItems = () => {
  return (
    <ul className="navitem-wrapper">
      <NavItem />
    </ul>
  );
};

const NavItem = () => {
  return navItemTitle.map((title, index) => (
    <li className="nav-item-box" key={index}>
      <div className="nav-item">{title}</div>
    </li>
  ));
};

const UserMenu = () => {
  return (
    <div className="usermenu-wrapper">
      <div className="search-icon">
        <SearchIcon />
      </div>

      <div className="alram-icon">
        <AlramIcon />
      </div>
      <img src={profile} alt="profile" width="28px" height="28px" />
    </div>
  );
};

const CompanyService = () => {
  return (
    <div className="cs-wrapper">
      <button className="cs-button">
        <p>기업 서비스</p>
      </button>
    </div>
  );
};

const GlobalNavBar = () => {
  return (
    <section className="gnb-wrapper">
      <Logo />
      <NavItems />
      <UserMenu />
      <CompanyService />
    </section>
  );
};

export default GlobalNavBar;
