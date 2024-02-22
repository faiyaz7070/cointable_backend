const mongoose=require("mongoose");
require("dotenv").config()

const connection=mongoose.connect("mongodb+srv://faiyaz:dulraz@cluster0.tohzp.mongodb.net/cointableapi?retryWrites=true&w=majority");

module.exports=connection;