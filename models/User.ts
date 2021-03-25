import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    regDate:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('users',UserSchema)
