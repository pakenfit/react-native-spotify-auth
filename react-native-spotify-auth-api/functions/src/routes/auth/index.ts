import { authorize, getToken, getRefreshedToken } from './auth';
import express from 'express';

const router = express.Router();

export default router
  .get('/callback', getToken)
  .get('/authorize', authorize)
  .post('/refresh_token', getRefreshedToken);
