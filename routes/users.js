import express from 'express';
import { loginUser, registerUser, getUserPreferences, addUserPreferences, getSavedNews, removeSavedNews, addSavedNews } from '../controller/users.js';
import { isAuthenticated } from '../middleware/auth.js';
import { getNewsByPreference } from '../controller/news.js';
import { addFavoriteNews, addReadNews, getFavoriteNews, getReadNews, removeFavoriteNews, removeReadNews } from '../controller/users.js';


const router = express.Router();

router.post('/signup', registerUser)
router.post('/login', loginUser)

router
  .get('/preferences', isAuthenticated, getNewsByPreference)
  .put('/preferences', isAuthenticated, addUserPreferences);

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