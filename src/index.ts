import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from './db';
import log4js from './logger';

dotenv.config();

const app: Application = express();
const logger = log4js.getLogger('file');
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await mongoose.connect(config.mongodb.url);
    logger.info('DB connected');
    app.listen(config.server.port, (): void =>
      logger.info(`server is running on port ${config.server.port}`)
    );
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Express server is running');
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

start();
