import axios from 'axios';
import dotenv from 'dotenv';
import News from '../models/news.js';

dotenv.config();



//Working
export const getNewsFromNewsAPI = async (topic) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&sortBy=popularity&apiKey=${process.env.NEWSAPI_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Working
export const getNewsFromGNews = async (topic) => {
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${topic}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Working
export const getNewsFromNewsAPITopHeadline = async (category) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Working
export const getNewsFromGNewsTopHeadline = async (category) => {

  try {
    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function storeNewsInDB(articles, category = '') {
  try {
    const newsToInsert = articles.map(article => ({
      ...article,
      fetchedAt: new Date()
    }));

    const news = await News.insertMany(newsToInsert);
    console.log(`${news.length} news articles stored in database`);
    return news;
  } catch (error) {
    console.error('Error storing news in database:', error.message);
    // Still return articles even if DB storage fails
    return articles;
  }
}