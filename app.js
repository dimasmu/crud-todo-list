const router = require('./src/route/index');
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config()




app.get("/test",async(req,res) => {
    console.log("testing")
})

// app.use((req,res,next) => {
//     res.status(200).json({
//         message: 'It works!'
//     })
// })

app.use(cors({ credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());
app.use(router);

module.exports = app;