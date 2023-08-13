import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cardsRouter from './routes/cards.js';
import userRouter from './routes/auth.js';


// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_PARAMS}`;



// Connect to your MongoDB database using mongoose


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3000', 'https://interest-match-front.vercel.app/'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
  }));
  
//changed origin
// DB Config 
mongoose.connect(connection_url, {

});

app.use('/user', userRouter);
app.use('/cards', cardsRouter);
app.use('/uploads', express.static('uploads'));



app.get('/', (req, res) => res.status(200).send('listening on localhost: 8001'));

app.listen(port, () => console.log(`listening on localhost: ${port}`));
