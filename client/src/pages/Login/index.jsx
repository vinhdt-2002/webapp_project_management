import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginThunk from "../../redux/thunk/login";
import "./style.scss";

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = 10;
const BACKGROUND_MOVEMENT_RANGE = 2;
const BACKGROUND_ROTATION_SCALE = 0.2;

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(login));
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth?.user, navigate]);

  return (
    <div className="page-container">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="tilt-card login"
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
            <h2 className="name">TaskHub</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                value={login.email}
                name="email"
                onChange={handleChangeInput}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={handleChangeInput}
                autoComplete="on"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button>Log in</button>
            <span href="/">Forgot password</span>
            <p>
              Don't have an account? <Link to={"/register"}>Register now</Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
