import express from "express"
import Auth from "../auth/auth.js"
import likeController from "../controllers/likes.js"

const router = express.Router();

router.post("/",Auth.validate,likeController.addLikes);
router.get("/:userId",Auth.validate,likeController.getLikedPosts);
router.get("/count/:id",Auth.validate,likeController.countLikes);
router.delete("/",Auth.validate,likeController.unlike)

export default router;
