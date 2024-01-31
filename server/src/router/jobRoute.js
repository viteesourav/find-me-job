import express from 'express';
import catchAsync from '../utils/catchAsyncError.js';
import { createJob, deleteJobDetailsById, fetchJobDetailsById, updateJobInfoById } from '../controllers/jobContoller.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

// Handles all Routes for Jobs Posting...

//Middleware before creating a jobPost: Must be Authenticated, Must be a companyUser [To DO]
router.post('/jobPosts', isAuthenticated, catchAsync(createJob));

router.route('/jobPosts/:id')
    .put(catchAsync(updateJobInfoById))
    .get(catchAsync(fetchJobDetailsById))
    .delete(catchAsync(deleteJobDetailsById));

export default router;
