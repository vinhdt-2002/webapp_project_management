import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import registerThunk from "../redux/thunk/register";
import "./Login/style.scss";

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = 10;
const BACKGROUND_MOVEMENT_RANGE = 2;
const BACKGROUND_ROTATION_SCALE = 0.2;

const Register = () => {
  const [register, setRegister] = useState({
    email: "",
    username: "",
    password: "",
    confirmPw: "",
  });
  const [errForm, setErrForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPw: "",
  });

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xBackground = useMotionValue(0);
  const yBackground = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const xBackgroundSpring = useSpring(xBackground);
  const yBackgroundSpring = useSpring(yBackground);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  const backgroundTransform = useMotionTemplate`
    translateX(${xBackgroundSpring}px) 
    translateY(${yBackgroundSpring}px) 
    rotateX(${xSpring}deg) 
    rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);

    const backgroundOffsetX =
      (mouseX / width - HALF_ROTATION_RANGE) * -BACKGROUND_MOVEMENT_RANGE;
    const backgroundOffsetY =
      (mouseY / height - HALF_ROTATION_RANGE) * -BACKGROUND_MOVEMENT_RANGE;

    xBackground.set(backgroundOffsetX);
    yBackground.set(backgroundOffsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    xBackground.set(0);
    yBackground.set(0);
  };

  const validateEmail = (email) => {
    return email.match(
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  function checkValidate(register) {
    const err = { email: "", username: "", password: "", confirmPw: "" };
    if (register.email.length === 0) {
      err.email = "Email không được để trống";
    } else if (!validateEmail(register.email)) {
      err.email = "Email chưa đúng định dạng";
    }

    if (register.username.length === 0) {
      err.username = "Tên tài khoản không được để trống";
    } else if (register.username.length > 12) {
      err.username = "Tên tài khoản không được dài quá 12 kí tự";
    } else if (register.username.length < 6) {
      err.username = "Tên tài khoản không được ngắn hơn 6 kí tự";
    }

    if (register.password.length === 0) {
      err.password = "Mật khẩu không được để trống";
    } else if (register.password.length > 25) {
      err.password = "Mật khẩu không được dài quá 25 kí tự";
    } else if (register.password.length < 6) {
      err.password = "Mật khẩu không được ngắn hơn 6 kí tự";
    } else if (register.password !== register.confirmPw) {
      err.confirmPw = "Xác nhận mật khẩu không chính xác";
    }

    return err;
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = checkValidate(register);
    if (err.email || err.username || err.password || err.confirmPw) {
      setErrForm({
        email: err.email,
        username: err.username,
        password: err.password,
        confirmPw: err.confirmPw,
      });
    } else {
      dispatch(registerThunk(register));
    }
  }

  if (auth?.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page-container">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="tilt-card register"
      >
        <motion.div
          className="background-card"
          style={{
            transform: backgroundTransform,
          }}
        ></motion.div>
        <motion.div
          className="inner-card"
          style={{
            transform,
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="logo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36flvXXdVddkrTva4CAirFVu9w0iunwTmB4n-RZ_RVA&s"
                alt="logo"
              />
            </div>
            <h2 className="name">Quản lý dự án</h2>
            <div className={`input-group ${errForm.email ? "err" : ""}`}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={register.email}
                onChange={handleChangeInput}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            {errForm.email && (
              <div className="input-group__label">
                <i className="bx bx-error-alt"></i>
                <p>{errForm.email}</p>
              </div>
            )}
            <div className={`input-group ${errForm.username ? "err" : ""}`}>
              <input
                type="text"
                placeholder="Tài Khoản"
                name="username"
                value={register.username}
                onChange={handleChangeInput}
              />
              <i className="bx bxs-user"></i>
            </div>
            {errForm.username && (
              <div className="input-group__label">
                <i className="bx bx-error-alt"></i>
                <p>{errForm.username}</p>
              </div>
            )}
            <div className={`input-group ${errForm.password ? "err" : ""}`}>
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                autoComplete="on"
                value={register.password}
                onChange={handleChangeInput}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            {errForm.password && (
              <div className="input-group__label">
                <i className="bx bx-error-alt"></i>
                <p>{errForm.password}</p>
              </div>
            )}
            <div className={`input-group ${errForm.confirmPw ? "err" : ""}`}>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPw"
                autoComplete="on"
                value={register.confirmPw}
                onChange={handleChangeInput}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            {errForm.confirmPw && (
              <div className="input-group__label">
                <i className="bx bx-error-alt"></i>
                <p>{errForm.confirmPw}</p>
              </div>
            )}
            <button>Đăng kí</button>
            <p>
              Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
