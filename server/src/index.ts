import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { profilesRouter } from './routes/profiles';
import { astroRouter } from './routes/astro';
import { dashboardRouter } from './routes/dashboard';
import { chatRouter } from './routes/chat';
import { subscriptionsRouter } from './routes/subscriptions';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { configureDb } from './config/database';
import { initializeAssociations } from './models';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

// Configure middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Initialize model associations
initializeAssociations();

// Database setup
configureDb();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/astro', astroRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/chat', chatRouter);
app.use('/api/subscriptions', subscriptionsRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;