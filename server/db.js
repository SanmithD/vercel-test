import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const connectionDB = await mongoose.connect(process.env.MONGO_URI || process.env.COMPASS );
        console.log(connectionDB.connection.host)
    } catch (error) {
        console.log(error)
    }
} 

export default connectDB