import express from "express"
import Auth from "../auth/auth.js"
import commentsController from "../controllers/comment.js"

const router = express.Router();

router.post("/",Auth.validate,commentsController.addComment);
router.get("/:userId",Auth.validate,commentsController.getCommentedPosts);
router.put("/:id",Auth.validate,commentsController.editComment);
router.delete("/",Auth.validate,commentsController.deleteComment)

export default router;
