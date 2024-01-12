import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const accountSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: [true, 'Please enter your name!'] },
    email: { type: String, required: [true, 'Please enter your email!'], validate: validator.isEmail },
    avatar: { type: String },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' },
    verified_email: { type: Boolean },
}, {
    timestamps: true,
})


// create access token
accountSchema.methods.createAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}


// create refresh token of random uuid
accountSchema.methods.createRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


export const Account = mongoose.model('Account', accountSchema);