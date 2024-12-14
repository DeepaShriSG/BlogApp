import mongoose from "../db/db.js"
import like from "./like.js"
import comment from "./comment.js"


const PostSchema = new mongoose.Schema({
    title: { type: String, required: [true, "title is required"]  },
    content: { type: String, required: [true, "content is required"] },
    image: { type: String, required: [true, "image is required"] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: [true, "userId is required"]  },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'like' }],
    tags:[{type:String}],
},
{
  collection: "posts",
  versionKey: false,
}

);

const posts = mongoose.model("posts",PostSchema);
export default posts;
