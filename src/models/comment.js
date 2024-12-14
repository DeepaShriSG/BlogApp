import mongoose from "../db/db.js"
import posts from "../models/posts.js"
import user from "../models/user.js"

const CommentSchema = new mongoose.Schema({
    content: { type: String,required: [true, "content is required"] }, 
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: [true, "postId is required"] }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: [true, "userId is required"] }, 
    createdAt: { type: Date, default: Date.now },
},
{
    collection: "comment",
    versionKey: false,
  }

);


const comment = mongoose.model("comment",CommentSchema);
export default comment;
