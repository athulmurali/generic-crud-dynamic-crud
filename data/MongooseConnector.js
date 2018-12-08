const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
module.exports= function(){
    return mongoose.connect(DB_URL,{useNewUrlParser: true})

}
