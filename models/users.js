const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    phone: {
        type: Number,

    },
    age: {
        type: Number,
        required: true,
        min: 0 // Age should be non-negative
    },
    address: {
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});
Userschema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt)
        person.password = hashedPassword
        next()
    } catch (error) {
        console.log(error)
    }
})
Userschema.methods.comparePassword = async function (parampass) {
    try {
        const isMatch = await bcrypt.compare(parampass, this.password)
        return isMatch
    } catch (error) {
        console.log("password didn't match", parampass, this.password)
        return false;
    }
}
//chatgpt tell me should i use this below line or next line to it to create model
User = mongoose.model('User', Userschema)

module.exports = User