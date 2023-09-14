import express from 'express';
import { PORT } from './config/constants.js';
import userRouter from './routes/userRoute.js';
import categoryRouter from './routes/serviceRoute.js';
import connectDB from './config/dbconfig.js';
import ErrorHandler from './middleware/errorHandler.js';
import authenticateToken from './middleware/userAuth.js';
import cookieParser from 'cookie-parser';

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRouter);
// app.use('/api/service-category', authenticateToken, categoryRouter);
app.use('/api/service-category', categoryRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
