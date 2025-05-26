import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app';

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log('MongoDB 연결완료');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB 에러:', err));
