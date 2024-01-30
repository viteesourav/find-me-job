import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { fetchAllUsers, fetchUserDetails, updateUserDetails } from '../controllers/userController.js';
import catchAsync from '../utils/catchAsyncError.js';

const router = express.Router();

router.post('/test', isAuthenticated); //Dummy Route for testing middleware..

router.get('/getAll', isAuthenticated, catchAsync(fetchAllUsers));

router.get('/getUserData', isAuthenticated, catchAsync(fetchUserDetails));

router.put('/updateUserData', isAuthenticated, catchAsync(updateUserDetails));

export default router;