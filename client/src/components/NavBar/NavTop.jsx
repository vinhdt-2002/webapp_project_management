import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "./nav-top.scss";

const NavTop = () => {
  const navigate = useNavigate();
  const [profileModel, setProfileModel] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  function close() {
    setProfileModel(false);
  }
  function logout() {
    localStorage.removeItem("logger");
    window.location.href = "/login";
  }

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="nav-top">
      {profileModel && <Profile close={close} />}
      <div className="search">
        <div className="back icon" onClick={() => navigate(-1)}>
          <i className="bx bx-left-arrow-alt"></i>
        </div>
        <div className="input">
          <input type="text" placeholder="Search" />
          <i className="bx bx-search"></i>
        </div>
      </div>
      <div className="right">
        <Link to={"/activate"} className="dropdown">
          <div className="notifi icon dropdown">
            <i className="bx bx-bell"></i>
          </div>{" "}
        </Link>

        <div
          className={`info dropdown ${dropdownActive ? "active" : ""}`}
          onClick={() => setDropdownActive(!dropdownActive)}
          ref={dropdownRef}
        >
          <div className="avatar">
            <img src={auth.user.avatar} alt="" />
          </div>
          <p className="name">{auth.user.username}</p>
          <i className="bx bx-chevron-down"></i>
          <div className="dropdown__content">
            <div className="item" onClick={() => setProfileModel(true)}>
              <i className="bx bx-user-circle"></i>
              <p>Profile</p>
            </div>
            <div className="line">
              <div></div>
            </div>
            <div className="item" onClick={logout}>
              <i className="bx bx-log-out"></i>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
