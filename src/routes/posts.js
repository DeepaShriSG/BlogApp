import express from "express"
import PostsController from "../controllers/posts.js"
import Auth from "../auth/auth.js"


const router = express.Router();


router.get("/",Auth.validate,PostsController.getPosts);
router.post("/",Auth.validate,PostsController.createPost)
router.get("/:id",Auth.validate,PostsController.getPostById);
router.post("/filter",Auth.validate,PostsController.getFilteredTags);
router.post("/delete/:id",Auth.validate,PostsController.deleteTags);
router.put("/:id",Auth.validate,PostsController.updatePost);
router.delete("/:id",Auth.validate,PostsController.deletePost);

export default router;

 