const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send("Test js file ")
})

app.listen(3000, function (){
    console.log("Server is running on port 3000")
})