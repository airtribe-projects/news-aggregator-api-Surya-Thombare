import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function db() {
  try {
    const connect = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@newsaggrigator.pz6q6.mongodb.net/news_app?retryWrites=true&w=majority&appName=newsaggrigator`);
    console.log('Connected to MongoDB!');
    return connect;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default db;