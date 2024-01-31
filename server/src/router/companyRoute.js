import express from 'express'
import { isAuthenticated } from '../middleware/authMiddleware.js';
import catchAsync from '../utils/catchAsyncError.js';
import { fetchAllCompanies, fetchAllCompanyJobs, fetchCompanyInfoById, fetchCompanyProfile, updateCompanyProfile } from '../controllers/companyController.js';
const router = express.Router();

//Here we group the '/companyProfile' GET and PUT Route.
router.route('/companyProfile')
    .get(isAuthenticated, catchAsync(fetchCompanyProfile))
    .put(isAuthenticated, catchAsync(updateCompanyProfile));

router.get('/companyProfile/:id', isAuthenticated, catchAsync(fetchCompanyInfoById));

router.get('/getAll', catchAsync(fetchAllCompanies));

router.get('/comapanyJobs', isAuthenticated, catchAsync(fetchAllCompanyJobs));

export default router;