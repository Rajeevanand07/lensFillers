import express from "express";
import { loginController, logoutController, registerController } from "../controllers/loginController.js";
import { isAuthenticated } from "../config/isAuthenicated.js";

const router = express.Router();

router.post('/register', registerController);
router.post("/login", loginController);
router.post("/logout",isAuthenticated, logoutController);

export default router;
