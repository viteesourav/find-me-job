import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import AppRouter from './router/index.js'
import errorHandler from './middleware/ErrorHandler.js'

//define the app server...
const app = express();

//App Middleware...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use(cors({
    credentials: true,
}))

//connect with a DB...
const MONGO_HOST_URL = 'mongodb://127.0.0.1:27017/findMeJob'
mongoose.connect(MONGO_HOST_URL).then(()=> console.log('DB Connection Successful'));
mongoose.connection.on('error', (err) => {
    console.log('DB Connection Error:', err);
})

//Handle Routes...
app.use(AppRouter);

//Handle Error Middleware...
app.use(errorHandler);

//configure the server...
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server is up and Running at ${PORT} !`);
})