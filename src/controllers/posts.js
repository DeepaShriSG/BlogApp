// Import dependencies
import postsModel from "../models/posts.js";
import Auth from "../auth/auth.js";
import upload from "../controllers/fileUpload.js";

// Create a new post
const createPost = async (req, res) => {
  try {
    
    upload.single("image")(req, res, async(err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading image", error: err.message });
      }

      const { title, content, userId, comments, likes, tags } = req.body;

      
      if (!title || !content || !userId) {
        return res.status(400).json({ message: "Title, content, and userId are required." });
      }

      let imageUrl = null;
      if (req.file) {
        imageUrl = req.file; 
      }  

      // Create the post object
      const newPost = {
            title,
            content,
            userId,
            comments: comments || [],
            likes: likes || [],
            tags: tags || [],
            image: imageUrl.path,
          };

     
      const savedPost = await postsModel.create(newPost);
      
     
      res.status(201).json({
        message: "Image uploaded successfully",
        data: savedPost, 
      });
    });
     
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all posts
const getPosts = async (req, res) => {
  try {
    const posts = await postsModel.find();
    res.status(200).send({ message: "Posts retrieved successfully", data: posts });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post retrieved successfully", data: post });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Filtering tags
const getFilteredTags = async (req, res) => {
  try {
    const tags = await req.body;

    if (!tags) {
      return res.status(400).send({
        message: "Tags are required to filter posts.",
      });
    }

    const filteredPosts = await postsModel.find(tags);

    // Check if any posts were found
    if (!filteredPosts.length) {
      return res.status(404).send({
        message: "No posts found for the given tags.",
      });
    }

    // Return the filtered posts
    res.status(200).send({
      message: "FilteredPosts are fetched successfully",
      data: filteredPosts,
    });
  } catch (error) {
    console.error("Error fetching posts by tags:", error);
    res.status(500).send({
      message: error.message,
    });
  }
};

// Update a post by ID and editing tags
const updatePost = async (req, res) => {
  try {
    let updatedPost = await postsModel.findById(req.params.id);

    const payload = await req.body;

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    } else {
      updatedPost.title = payload.title;
      updatedPost.content = payload.content;
      updatedPost.tags = payload.tags;

      await updatedPost.save();

      res.status(200).send({ message: "Post updated successfully", data: updatedPost });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//deleting tags
const deleteTags = async (req, res) => {
  try {
    let postId = await req.params.id;
    let tags = await req.body;
    if (tags) {
      let post = await postsModel.findById(postId);

      if (!post) {
        res.status(401).send({
          message: "Post not found",
        });
      }

      const updatedTags = post.tags.filter((tag) => {
        !post.tags.includes(tag);
      });
      post.tags = updatedTags;
      await post.save();

      res.status(200).send({
        message: "tags deleted successfully",
        data: post,
      });
    } else {
      res.status(400).send({
        message: "tag not exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const deletedPost = await postsModel.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post deleted successfully", data: deletedPost });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { createPost, getPosts, getPostById, getFilteredTags, deleteTags, updatePost, deletePost };
