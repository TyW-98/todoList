const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
  res.send('Test js file ')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})