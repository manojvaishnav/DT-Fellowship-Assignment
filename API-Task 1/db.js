const { MongoClient } = require('mongodb');
require('dotenv').config()

// MongoDB connection URL
let url = 'mongodb://127.0.0.1:27017/events'
if(process.env.DB_URI){
  url=process.env.DB_URI;
}
// Function to establish the database connection
async function connectDB() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db();
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = connectDB