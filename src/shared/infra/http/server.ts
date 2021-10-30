import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@shared/errors/appError';
import createConnection from '../typeorm';
import { router } from './routes';
import '../../container';
import '../../container/providers';

createConnection();
const app = express();
app.use(express.json());
app.use("/tmp", express.static("tmp"));
app.use(router);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server - ${err.message}`,
  });
});

app.listen(3333, () => console.log('Server is running'));
