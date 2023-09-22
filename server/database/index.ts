import mongoose from 'mongoose';

const connectToDb = () => mongoose.connect(process.env.MONGODB_URI!);

export { connectToDb };
