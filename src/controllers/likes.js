import likeModel from "../models/like.js";
import postModel from "../models/posts.js";
import mongoose from "mongoose";

const addLikes = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    console.log(req.body);
    if (!postId || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingLike = await likeModel.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ error: "User has already liked this blog" });
    }

    const like = new likeModel({ postId, userId });
    await like.save();
    const post = await postModel.findById(postId);
    if (post) {
      post.likes.push(like._id);
      await post.save();
    }
    res.status(201).json({ message: "Blog liked successfully", like });
  } catch (error) {
    res.status(500).json({ error: "Failed to like blog", details: error.message });
  }
};

const countLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await likeModel.find({ postId });
    res.status(200).json({ count: likes.length, likes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch likes", details: error.message });
  }
};

const getLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const likes = await likeModel.find({ userId });

    const postIds = likes.map((like) => like.postId);

    const posts = await postModel.find({ _id: { $in: postIds } });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch liked posts", details: error.message });
  }
};

const unlike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the like associated with the userId and postId
    const like = await likeModel.findOne({ userId, postId });
    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    // Find the post to update its likes array
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Remove the like ID from the post's likes array
    post.likes = post.likes.filter((id) => id.toString() !== like._id.toString());
    await post.save();

    // Delete the like document from the database
    await likeModel.findByIdAndDelete(like._id);

    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove like", details: error.message });
  }
};

export default { unlike, getLikedPosts, countLikes, addLikes };
