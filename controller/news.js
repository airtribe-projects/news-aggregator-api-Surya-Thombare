import { combineTopHeadlines, combinedNewsByPrefrences } from '../helper/news.js';
import { storeNewsInDB } from '../lib/news.js';
import User from '../models/users.js';
import { cacheNewsInRedis, getNewsFromRedis } from '../redis/utills.js';

export const getTopHealines = async (req, res) => {
  try {

    const cachedNews = await getNewsFromRedis();

    if (cachedNews) {
      // Return cached news if available
      return res.json({
        source: 'cache',
        articles: cachedNews
      });
    }

    // Fix This : First store the news in the database and then cache it in Redis and then return the response from database

    const news = await combineTopHeadlines();

    const savedNews = await storeNewsInDB(news);

    console.log('Saved news:', savedNews);

    await cacheNewsInRedis(savedNews);

    return res.status(200).json({ source: 'api', savedNews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getNewsByPreference = async (req, res) => {
  const { email } = req.user;
  try {
    const { preferences } = await User.findOne({ email }).exec();

    const uniquePreferences = [...new Set(preferences)];
    if (preferences.length < 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const news = await combinedNewsByPrefrences(uniquePreferences);
    return res.status(200).json({ news });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });

  }
}
