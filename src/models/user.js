import mongoose from "../db/db.js"

const validateEmail = (e) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e);
  };
  

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"],  
        validate: {
        validator: validateEmail,
        message: "Invalid email format",
      },},
    password: { type: String, required: [true, "Password is required"] },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"], 
      },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    collection: "user",
    versionKey: false,
  }
);

const user = mongoose.model("user",userSchema);
export default user;
