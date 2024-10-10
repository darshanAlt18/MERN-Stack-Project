const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// Secure the Password with the bcrypt(Hash function).

registerSchema.pre("save", async function (next) {
    const user = this;
    // console.log(user);

    if (!user.isModified('password')) {
        next();     // next -> create User 
    }
    try {
        const saltround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltround);
        user.password = hash_password;
    } catch (error) {
        console.log(error);
    }
})
// JWT
registerSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email
        }, 
            process.env.JWT_SECRETKEY, {
            expiresIn: "100d"
        }
        )
    } catch (error) {
        console.return(error);

    }
}

const User = new mongoose.model("User", registerSchema);
module.exports = User;

