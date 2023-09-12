import express from 'express';
import { PORT } from './config/constants.js';
import userRouter from './routes/userRoute.js';
import connectDB from './config/dbconfig.js';
const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
