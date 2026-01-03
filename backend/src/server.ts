import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import githubRoutes from './routes/githubRoutes';

// 1. Config
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(express.json());
// Allow requests from our future Angular app (usually port 4200)
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(helmet());

// 3. Database Connection
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI as string;
        await mongoose.connect(uri);
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};

// 4. Basic Routes (Placeholder)
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

app.use('/api/user', githubRoutes);

// 5. Start Server
const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

start();