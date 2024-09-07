import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Interface
export interface IAccount {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    verified_email: boolean;
    createAccessToken: () => string;
    createRefreshToken: () => string;
}

const accountSchema = new mongoose.Schema<IAccount>({
    id: { type: String },
    name: { type: String, required: [true, 'Please enter your name!'] },
    email: { type: String, required: [true, 'Please enter your email!'] },
    avatar: { type: String },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' },
    verified_email: { type: Boolean },
}, {
    timestamps: true,
})


// create access token
accountSchema.methods.createAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15s' });
}


// create refresh token of random uuid
accountSchema.methods.createRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
}


export const Account = mongoose.model<IAccount>('Account', accountSchema);