import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

const NavBar = ({ nav, setNav }) => {
  const p = useLocation();
  let opacity = nav ? "1" : "0";
  let transitionDelay = nav ? "0.5s" : "0s";
  return (
    <div className="nav">
      <div
        className="top"
        style={{
          opacity: opacity,
          transitionProperty: "opacity",
          transitionDelay: transitionDelay,
        }}
      >
        <a className="logo" href="https://usth.edu.vn/en/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36flvXXdVddkrTva4CAirFVu9w0iunwTmB4n-RZ_RVA&s"
            alt="logo"
          />
        </a>
        <div className="info">
          <h3>TaskHub</h3>
          <p>WorkSpace</p>
        </div>
        <div className="icon" onClick={() => setNav(false)}>
          <i className="bx bx-chevron-left"></i>
        </div>
      </div>
      <div
        className="mid"
        style={{
          opacity: opacity,
          transitionProperty: "opacity",
          transitionDelay: transitionDelay,
        }}
      >
        <Link
          to={"/activate"}
          className={`item ${p.pathname === "/activate" ? "active" : ""}`}
        >
          <i className="bx bx-run"></i>
          <p>Hoạt động</p>
        </Link>

        <div className="line"></div>
        <Link to={"/"} className={`item ${p.pathname === "/" ? "active" : ""}`}>
          <i className="bx bx-home"></i>
          <p>Tổng quan</p>
        </Link>
        <Link
          to={"/board"}
          className={`item ${p.pathname.startsWith("/board") ? "active" : ""}`}
        >
          <i className="bx bx-grid-alt"></i>
          <p>Dự án</p>
        </Link>
        <div className="item">
          <i className="bx bx-calendar-minus"></i>
          <p>Lịch trình</p>
        </div>
      </div>

      <div
        className="bot"
        style={{
          opacity: opacity,
          transitionProperty: "opacity",
          transitionDelay: transitionDelay,
        }}
      >
        <div className="item">
          <i className="bx bx-help-circle"></i>
          <p>Giúp đỡ</p>
        </div>
        <div className="item">
          <i className="bx bx-cog"></i>
          <p>Cài đặt</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
