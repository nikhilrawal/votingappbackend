const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')
const candidateschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0 // Age should be non-negative
    },
    votes: [{

        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        time: {
            type: Date,
            default: Date.now()

        }
    }],
    votecount: {
        type: Number,
        default: 0
    },
});

Candidate = mongoose.model('Candidate', candidateschema)
module.exports = Candidate