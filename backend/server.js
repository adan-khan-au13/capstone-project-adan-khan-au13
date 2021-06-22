import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from "./routers/userRouter.js";
const port = process.env.PORT || 4000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shopaholic', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.get("/", (req,res) => {
    res.send("server is ready")
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
});