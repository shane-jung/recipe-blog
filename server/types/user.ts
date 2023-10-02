import mongoose from 'mongoose';

interface User {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    isAdmin: boolean;
}

export default User;
