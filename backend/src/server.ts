import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import githubRoutes from './routes/githubRoutes';

// 1. Config
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(express.json());

// Allow requests from local development and deployed frontend
app.use(cors({
    origin: ['http://localhost:4200', 'https://uptime-ai-delta.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
})); 

app.use(helmet());

// 3. Basic Route (Health Check)
// Render uses this to check if your server is awake
app.get('/', (req: Request, res: Response) => {
    res.send('GitHub Proxy API is running...');
});

// 4. API Routes
app.use('/api/user', githubRoutes);

// 5. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Proxy Server running on port ${PORT}`);
});