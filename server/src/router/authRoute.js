import express from 'express'
import { doLogin, register } from '../controllers/authentication.js';
import catchAsync from '../utils/catchAsyncError.js';

const router = express.Router();

// Defining Auth Routes...

router.post('/login', catchAsync(register));
router.post('/register', catchAsync(doLogin));

export default router;