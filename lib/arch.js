// Required dependencies
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');
const mongoose = require('mongoose');

// Initialize Express Router
const router = express.Router();


// Connect to Redis



// News API Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const DEFAULT_COUNTRY = 'us'; // Default country code
const REDIS_CACHE_EXPIRATION = 3600; // Cache expiry in seconds (1 hour)
const REDIS_NEWS_KEY = 'latest_news'; // Redis key for storing news



// News Route Handler
router.get('/', async (req, res) => {
  try {
    const country = req.query.country || DEFAULT_COUNTRY;
    const category = req.query.category || '';

    // Step 1: Check Redis Cache
    const cachedNews = await getNewsFromRedis(country, category);

    if (cachedNews) {
      // Return cached news if available
      return res.json({
        source: 'cache',
        articles: cachedNews
      });
    }

    // Step 2: Fetch from News API if not in cache
    const articles = await fetchNewsFromAPI(country, category);

    // Step 3: Store in Database
    await storeNewsInDB(articles, category);

    // Step 4: Store in Redis Cache
    await cacheNewsInRedis(articles, country, category);

    // Return fetched news
    return res.json({
      source: 'api',
      articles
    });

  } catch (error) {
    console.error('News route error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Route for getting historical news from database
router.get('/historical', async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.publishedAt = {};

      if (startDate) {
        query.publishedAt.$gte = new Date(startDate);
      }

      if (endDate) {
        query.publishedAt.$lte = new Date(endDate);
      }
    }

    // Find historical news with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const articles = await News.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments(query);

    return res.json({
      articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Historical news route error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch historical news' });
  }
});

// Export the router
module.exports = router;