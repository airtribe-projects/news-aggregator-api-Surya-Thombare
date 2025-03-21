import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();



//Working
export const getNewsFromNewsAPI = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${'maharashtra'}&q=${'tech'}&sortBy=popularity&apiKey=${process.env.NEWSAPI_API_KEY}`);
    console.log(response.data);
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Working
export const getNewsFromGNews = async () => {
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${'maharashtra'}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`);
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}


