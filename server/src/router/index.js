import express from 'express'
import AuthRoute from './authRoute.js'
import UserRoute from './userRoute.js'

const router = express.Router();
//Holds all the Routes at one place...
const URL_PATH = '/api-v1';

// Handles Auth Routes...
router.use(`${URL_PATH}/auth`, AuthRoute); // /api-v1/auth/user [register or login]

//Handle User Routes...
router.use(`${URL_PATH}/user`, UserRoute); // /api-v1/user/

export default router;

