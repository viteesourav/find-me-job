import express from 'express'
import AuthRoute from './authRoute.js'
import UserRoute from './userRoute.js'
import CompanyRoute from './companyRoute.js'
import JobRoutes from './jobRoute.js'

const router = express.Router();
//Holds all the Routes at one place...
const URL_PATH = '/api-v1';

// Handles Auth Routes...
router.use(`${URL_PATH}/auth`, AuthRoute); // /api-v1/auth/ [register or login]

//Handle User Routes...
router.use(`${URL_PATH}/user`, UserRoute); // /api-v1/user/

//Handle company Routes...
router.use(`${URL_PATH}/company`, CompanyRoute); // /api-v1/company/

//Handle Job Routes...
router.use(`${URL_PATH}/job`, JobRoutes); // /api-v1/job/


export default router;