import axios from 'axios';
import dotenv from 'dotenv';

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


