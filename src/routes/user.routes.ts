import express from "express";
import userController from "../controllers/user.controller";
import { authenticateUser } from "../middleware/user.middleware";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

// Route accessible only to admins
router.get('/', authenticateUser, userController.getAllUsers);

export default router;
