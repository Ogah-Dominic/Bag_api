const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: "./Config/config.env"})
const app = require('./app');

const DB = process.env.DATABASE

mongoose.connect(DB
    ).then(()=>{
        console.log('Mongoose Connected.')
    }).then(()=>{
                app.listen(process.env.PORT || 9090,()=>{
                    console.log('Server connected sucessfully.')
                })
    });