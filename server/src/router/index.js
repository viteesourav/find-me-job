import express from 'express'
import AuthRoute from './authRoute.js'


const router = express.Router();
//Holds all the Routes at one place...
const URL_PATH = '/api-v1/';

// Handles Auth Routes...
router.use(`${URL_PATH}auth`, AuthRoute); // /api-v1/auth/[register or login]

export default router;

