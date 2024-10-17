const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const apis = require('./apis');
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3001,()=>{
    console.log('listening....');
})
apis(app)



