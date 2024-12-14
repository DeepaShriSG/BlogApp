import express from "express"
import UserRoutes from "../routes/user.js"
import PostsRoutes from "../routes/posts.js"
import likeRoutes from "../routes/like.js"
import commentRoutes from "../routes/comment.js"

const router = express.Router();

router.use("/user",UserRoutes);
router.use("/posts",PostsRoutes);
router.use("/likes",likeRoutes);
router.use("/comment",commentRoutes);


export default router