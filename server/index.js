const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session')
const port = 3001;
const foodModel = require('./models/food');
const restApi = require('./backend/api');

app.use(cors())

app.use(express.json());

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );
  
restApi(app)

app.listen((port), () => {
    console.log(`server running  on port${port}`)
})