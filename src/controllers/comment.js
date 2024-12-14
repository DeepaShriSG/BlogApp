import commentModel from "../models/comment.js";
import postModel from "../models/posts.js";
import userModel from "../models/user.js";

const addComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const comment = await new commentModel({ postId, userId, content });
    await comment.save();
    const post = await postModel.findById(postId);
    console.log(post.comments);
    if (post) {
      post.comments.push(comment._id);
      await post.save();
    }
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

const getCommentedPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const comments = await commentModel.find({ userId });

    const postIds = comments.map((comment) => comment.postId);

    const posts = await postModel.find({ _id: { $in: postIds } });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch liked posts", details: error.message });
  }
};

const editComment = async (req,res) => {
  try {
      const {id} = await req.params.id;
      let comment = await commentModel.findById({_id:req.params.id});
      console.log(comment)
      if(comment){
        comment.content = await req.body.content;
        await comment.save();
        res.status(200).send({
          message:"Comment edited successfully",
          comment
        })
      }else{
        res.status(400).send({
          message:"Comment not found"
        })
      }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to edit comment", details: error.message });
  }
}

const deleteComment = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const comment = await commentModel.findOne({ userId, postId });
    if (!comment) {
      return res.status(404).json({ error: "comment not found" });
    }

    // Find the post to update its likes array
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments = post.comments.filter((id) => id.toString() !== comment._id.toString());
    await post.save();

    // Delete the like document from the database
    await commentModel.findByIdAndDelete(comment._id);

    res.status(200).json({ message: "Comment removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove comment", details: error.message });
  }
};

export default { addComment, editComment,getCommentedPosts, deleteComment };
