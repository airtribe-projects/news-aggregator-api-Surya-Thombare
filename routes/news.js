import express from 'express';
import { getTopHealines } from '../controller/news.js';
import { isAuthenticated } from '../middleware/auth.js';
import { getNewsByPreference, addFavoriteNews, addReadNews, getFavoriteNews, getReadNews, removeFavoriteNews, removeReadNews, getSavedNews, removeSavedNews, addSavedNews } from '../controller/news.js';

const router = express.Router();

router.get('/', isAuthenticated, getTopHealines);

router
  .get('/preferences', isAuthenticated, getNewsByPreference)

router
  .get('/favorites', isAuthenticated, getFavoriteNews)
  .post('/:id/favorite', isAuthenticated, addFavoriteNews)
  .delete('/:id/favorite', isAuthenticated, removeFavoriteNews);

router
  .get('/read', isAuthenticated, getReadNews)
  .post('/:id/read', isAuthenticated, addReadNews)
  .delete('/:id/read', isAuthenticated, removeReadNews);

router
  .get('/saved', isAuthenticated, getSavedNews)
  .post('/:id/saved', isAuthenticated, addSavedNews)
  .delete('/:id/saved', isAuthenticated, removeSavedNews);


export default router;