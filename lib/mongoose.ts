import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected')
        return true;
    }
    try {
        await mongoose.connect(process.env.NEXT_DATABASE_URL!);
        console.log('Mongodb connected')
        return true;
    } catch (error) {
        console.log(error, 'Mongodb connection failed')
    }
}

export default connectDB;