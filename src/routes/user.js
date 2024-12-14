import express from "express"
import UserController from "../controllers/user.js"
import Auth from "../auth/auth.js"

const router = express.Router();

router.post("/",UserController.signup);
router.post("/login",UserController.login);
router.get("/",UserController.getUser);
router.get("/:id",UserController.getuserById);
router.put("/",Auth.validate,UserController.editUser);

export default router