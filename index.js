const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary=require("cloudinary").v2


const cuadrosRouter = require("./src/api/routes/cuadros.routes");
const pintoresRouter = require("./src/api/routes/pintores.routes");

const {connect}= require("./src/utils/database")

dotenv.config()

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

server.use(cors({
    origin: "*",
    credentials: true
}))


server.use("/cuadros", cuadrosRouter)
server.use("/pintores", pintoresRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})