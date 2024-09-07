import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: [true, 'Please enter your email!'] },
    avatar: { type: String },
    password: {
        type: String,
        required: [true, 'Please enter the password!'],
        minLength: [8, "Password should be at least six characters long!"],
    },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' },
    refreshTokens: { type: [String], default: [] },
}, {
    timestamps: true,
});
// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});
//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// create access token
userSchema.methods.createAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
};
// create refresh token of random uuid
userSchema.methods.createRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};
export const User = mongoose.model('User', userSchema);
