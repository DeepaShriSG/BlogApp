import mongoose from "../db/db.js"


const LikeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: [true, "postId is required"]  }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: [true, "userId is required"]  }, 
    createdAt: { type: Date, default: Date.now() }, 
},
{
    collection: "like",
    versionKey: false,
  }
);

const likes = mongoose.model('like', LikeSchema);
export default likes;