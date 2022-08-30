// import mongoose 
import mongoose from "mongoose";
 
// Create a Schema
const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    }
});
 
// export model
export default mongoose.model('Users', User);