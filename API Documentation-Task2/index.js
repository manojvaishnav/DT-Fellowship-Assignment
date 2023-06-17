const express = require('express');
const mongoose = require('mongoose');
const app = express();
const nudgesRouter = require('./routes/nudges');
require('dotenv').config()
let url = 'mongodb://127.0.0.1:27017/nudge-management'
if(process.env.DB_URI){
  url=process.env.DB_URI;
}
// Connect to MongoDB Compass
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



// Middleware
app.use(express.json());

// Routes
app.use('/api/nudges', nudgesRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});