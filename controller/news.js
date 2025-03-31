import { combineTopHeadlines, combinedNewsByPrefrences } from '../helper/news.js';
import { storeNewsInDB } from '../lib/news.js';
import News from '../models/news.js';
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

export const getSeachedNews = async (req, res) => {
  const { text } = req.body;
  try {
    const news = await combinedNewsByPrefrences(text);
    return res.status(200).json({ news });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getFavoriteNews = async (req, res) => {
  const { email } = req.user;
  console.log(email);
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.favorites.length === 0) {
      return res.status(200).json({ message: 'No favorites found' });
    }

    const news = await News.find({ _id: { $in: user.favorites } }).exec();

    return res.status(200).json({ favorites: news });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });

  }
}

export const addFavoriteNews = async (req, res) => {
  const { email } = req.user;
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ message: 'Please provide articleId' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.favorites.push(articleId);
    await user.save();
    return res.status(200).json({ message: 'Article added to favorites successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const removeFavoriteNews = async (req, res) => {
  const { email } = req.user;
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ message: 'Please provide articleId' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(id => id !== articleId);
    await user.save();
    return res.status(200).json({ message: 'Article removed from favorites successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getReadNews = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.favorites.length === 0) {
      return res.status(200).json({ message: 'No read found' });
    }

    const news = await News.find({ _id: { $in: user.read } }).exec();

    return res.status(200).json({ read: news });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });

  }
}

export const addReadNews = async (req, res) => {
  const { email } = req.user;
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ message: 'Please provide articleId' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.read.push(articleId);
    await user.save();
    return res.status(200).json({ message: 'Article added to read successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const removeReadNews = async (req, res) => {
  const { email } = req.user;
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ message: 'Please provide articleId' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.read = user.read.filter(id => id !== articleId);
    await user.save();
    return res.status(200).json({ message: 'Article removed from read successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getSavedNews = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.favorites.length === 0) {
      return res.status(200).json({ message: 'No saved found' });
    }

    const news = await News.find({ _id: { $in: user.saved } }).exec();

    return res.status(200).json({ saved: news });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const addSavedNews = async (req, res) => {
  const { email } = req.user;
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ message: 'Please provide articleId' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.saved.push(articleId);
    await user.save();
    return res.status(200).json({ message: 'Article added to saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const removeSavedNews = async (req, res) => {
  const { email } = req.user;
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ message: 'Please provide articleId' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.saved = user.saved.filter(id => id !== articleId);
    await user.save();
    return res.status(200).json({ message: 'Article removed from saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}