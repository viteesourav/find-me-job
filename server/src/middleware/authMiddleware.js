
//Check the Auth Token coming in the header of the API Request...
//Syntax: Authentication: Bearer JWT_TOKEN..

import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/authHelper.js';

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
    } catch(err) {
        return res.status(403).json({
            status: 'Token Invalid or Expired',
            errMsg: err
        })
    }
    next();
}

export {
    isAuthenticated
}