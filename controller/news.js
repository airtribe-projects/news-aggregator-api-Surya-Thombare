import { combineTopHeadlines, combinedNewsByPrefrences } from '../helper/news.js';
import User from '../models/users.js';

export const getTopHealines = async (req, res) => {
  try {

    const news = await combineTopHeadlines();

    return res.status(200).json({ news });
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
