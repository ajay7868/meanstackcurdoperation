const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {type: String},
    email: {
        type: String,
        unique:true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        required:true
    },
    phone: { type: Number, required: true},
    address: String,
    signuser:
    { type: mongoose.Schema.Types.ObjectId, ref: 'SignUser' },
},
{ versionKey: false },
 {
        collection: 'user'
    }
   )
var User = mongoose.model('user', userSchema);

module.exports = User;