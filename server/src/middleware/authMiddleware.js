
//Check the Auth Token coming in the header of the API Request...
//Syntax: Authentication: Bearer JWT_TOKEN..

import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/authHelper.js';
import { fetchCompanyById } from '../models/companyModel.js';

// Here we using classing try catch block to catch any exception, and pass the error to Error Middleware..
const isAuthenticated = (req, res, next) => {
    const authToken = req?.get('Authorization')?.toString();
    // If JWT Token exists and if it started without 'Bearer ', If not then some issue with Header...
    if(!authToken || !authToken?.startsWith('Bearer '))
        return res.status(403).json({
            message: 'Service is not Authorized'
        }).end();
    //check if this is the correct JWT Token or not ?
    try {
        const tokenPaylod = jwt.verify(authToken.split(' ')[1], JWT_SECRET_KEY);
        
        //Extract the authorId form Token Payload and store in req.body...[will be used for Authorization]  
        req.body.authorId = tokenPaylod.authorId; 
        
        next();
    } catch(err) {
        return res.status(401).json({
            status: 'Token Invalid or Expired',
            errMsg: err
        })
    }
}

// Check if the authorId belongs to a Company ?
const isCompanyUser = async (req, res, next) => {
    // isAuthenticated middleware already populates the req.body with authorId from JWT token...
    const{authorId} = req.body;

    // check if we have any company with that Id...
    try {
        const company = await fetchCompanyById(authorId);

        if(!company) {
            return res.status(403).json({
                message: 'The Current LoggedIn User is not a registered Company'
            }).end();
        }
        next();
    } catch(error) {
        next(error);
    }
}

export {
    isAuthenticated,
    isCompanyUser,
}