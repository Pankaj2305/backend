const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userroute');

const app = express();

app.use(cors());

app.use(express.json()); 
app.use('/user', userRoutes); 


mongoose.connect("mongodb://localhost:27017/") 
  .then(() => {
    console.log('Server is successfully connected to the database');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });


app.listen(8585, () => {
  console.log("Server is running on port 8585");
});
