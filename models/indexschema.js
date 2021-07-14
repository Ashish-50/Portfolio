const mongoose = require('mongoose');

const feedSchema =new  mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    msg:{
        type:String
    }
})

const Feed = mongoose.model('Feed',feedSchema);

module.exports = Feed;