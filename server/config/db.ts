import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        var models_path = path.join(__dirname, '../model');
        fs.readdirSync(models_path).forEach(function (file) {
            if (~file.indexOf('.ts')) {
                require(models_path + '/' + file);
            }
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;
