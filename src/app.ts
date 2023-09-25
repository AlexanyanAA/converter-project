import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/converter', apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development'; // Default to 'development'
const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://myuser:mypassword@db:5432/mydatabase';

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`Database connection: ${DATABASE_URL}`);
});
