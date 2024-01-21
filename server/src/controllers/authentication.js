import { createUser, getUserByEmail } from "../models/userModel.js";
import { createToken, parsePassword } from "../utils/authHelper.js";

// Register a new user...
const register = async (req, res, next) => {
    const {
        firstName, lastName, email, password, 
        accountType, contact, location, profileUrl, jobTitle, 
        about
    } = req.body;

    // Field validation...
    if(!firstName || !lastName || !email || !password) {
        return next('Field Validation Failed !');
    }

    //Check if the user already Exist ?
    const user = await getUserByEmail(email);
    if(user) {
        return next('User already Exist');
    }

    //Creation of newUser...
    const salt = generateSalt();
    const newUser = await createUser({
        firstName,lastName,
        email,
        authentication:{
            password: parsePassword(password, salt),
            salt
        },
        accountType,contact,location,profileUrl,jobTitle,about,
    });
    const jwtToken = createToken(newUser._id);
    return res.status(201).json({
        message: 'user Successfully created',
        jwtToken,
        user: {
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName   
        }
    }).end();
}

//Login Controller...
const doLogin = async (req, res, next) => {
    
    //Field Validation:
    const{email, password} = req.body;

    if(!email || !password) {
        return next('Either or Passward is mandatory');
    }

    //Verify the Login...
    const user = await getUserByEmail(email);
    if(!user) {
        return next('Either Email or password is Invalid');
    }
    const jwtToken = createToken(user._id);
    return res.status(200).json({
        message: 'Login Successful',
        jwtToken,
        user: {
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName   
        }
    }).end();
}

export {
    register,
    doLogin
}