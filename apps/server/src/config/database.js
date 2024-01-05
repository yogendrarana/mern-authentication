import mongoose from "mongoose";

export const connectdb = async () => {
    try{
        const { connection } = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Database connected with ${connection.host}`);
    }catch(err){
        console.log(err.message);
    }
}