import * as functions from 'firebase-functions';
import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';

import authRouter from './routes/auth';

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', authRouter);

export const api = functions.https.onRequest(app);
