import { Router } from "express";
import {
  login,
  refreshToken,
  register,
  searchUser,
} from "../controllers/authCtrl.js";
import { updateProfile } from "../controllers/userCtrl.js";
import { isAuth } from "../middleware/index.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.get("/searchUser", isAuth, searchUser);
router.post("/profile/:id", isAuth, updateProfile);

export default router;
