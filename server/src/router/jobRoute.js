import express from 'express';
import catchAsync from '../utils/catchAsyncError.js';
import { createJob, deleteJobDetailsById, fetchJobDetailsById, fetchJobs, updateJobInfoById } from '../controllers/jobContoller.js';
import { isAuthenticated, isCompanyUser } from '../middleware/authMiddleware.js';
const router = express.Router();

// Handles all Routes for Jobs Posting...

//Middleware before creating, updating and deleting a jobPost: User must be Authenticated and must be a companyUser
//NOTE: For fetchJobs --> It is our Landing Page, So we will fetch Jobs Irrespective of the user is LoggedIn...
router.route('/jobPosts')
    .post(isAuthenticated, isCompanyUser, catchAsync(createJob))
    .get(catchAsync(fetchJobs));

router.route('/jobPosts/:id')
    .put(isAuthenticated, isCompanyUser, catchAsync(updateJobInfoById))
    .get(isAuthenticated, catchAsync(fetchJobDetailsById))
    .delete(isAuthenticated, isCompanyUser, catchAsync(deleteJobDetailsById));

export default router;
