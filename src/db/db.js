import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();


    try {
        await mongoose.connect(`${process.env.dbUrl}/${process.env.dbName}`);
        console.log("db connected")
    } catch (error) {
        console.log(error);
        error.message;
    }


export default mongoose;