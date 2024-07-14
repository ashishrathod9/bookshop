import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
import cors from "cors";
import path from "path";


const app = express();
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
dotenv.config();
const PORT= process.env.PORT || 4001;
const URI= process.env.MongoDBURI;

try
{
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connected to mongodb");
}
catch(error)
{
    console.log("Error:", error);
}

app.use("/book",bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});