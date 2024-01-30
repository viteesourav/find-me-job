import express from 'express'
import { companyRegister, doCompanyLogin, doLogin, register } from '../controllers/authentication.js';
import catchAsync from '../utils/catchAsyncError.js';

const router = express.Router();

// Defining Auth Routes...
//User Routes..
router.get('/user/login', catchAsync(doLogin));
router.post('/user/register', catchAsync(register));

//Company Routes...
router.get('/company/login', catchAsync(doCompanyLogin));
router.post('/company/register', catchAsync(companyRegister));

export default router;