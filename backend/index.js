//import express
import express from "express";
//import mongoose
import mongoose from "mongoose";
// import routes
import route from "./routes/index.js";
//import cors
import cors from "cors";
// express function
const app = express();
 
// connect to mongoDB database
mongoose.connect("mongodb://localhost:27017/user_Register_db",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 

// middleware 
app.use(cors());
app.use(express.json());
app.use('/Users',route);
 
// listening to port
app.listen('5000',()=> console.log('Server Running at port: 5000'));    