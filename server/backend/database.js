const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv:';

let client; // Declare the client variable

async function main() {
  try {
    if (!client) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect(); // Connect to the MongoDB server
      console.log('Connected to MongoDB successfully!');
    }
    const database = client.db('test');
    
    return database;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  main
};
