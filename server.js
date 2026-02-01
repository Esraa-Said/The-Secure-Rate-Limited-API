const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const connectDB = require("./config/connectDB");

dotenv.config();
connectDB();

const app = express();


app.use(express.json());
app.use(morgan('dev'));



app.get('/', (req, res)=>{
    res.status(200).send(`<h1>HEllo</h1>`)
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
