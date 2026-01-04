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

// Allow requests from anywhere (for now). 
// Once deployed, you could restrict this to your Vercel URL for extra security.
app.use(cors()); 

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