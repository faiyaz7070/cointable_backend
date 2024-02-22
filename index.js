const express=require("express");
const connection=require("./db")
const userRouter=require("./routes/user.route");
const postRouter=require("./routes/post.route");
const bodyParser = require('body-parser');
require("dotenv").config()

const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Cointab SE-ASSIGNMENT</h1><button onclick="getAllUsers()">All Users</button>');
});

app.use("/", userRouter);
app.use("/", postRouter);

app.listen(6500, async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port 6500`);
})