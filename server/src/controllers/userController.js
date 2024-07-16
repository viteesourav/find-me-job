//Handles the controller for User Actions...
import { getAllUsers, getUserById, updateUserById } from "../models/userModel.js"

// NOTE: In Routes, this fun is wrapped with async error catcher to catch any error it encounters...
const fetchAllUsers = async (req,res) => {
    const{authorId} = req.body;
    const allUsersInfo = await getAllUsers();
    res.status(200).json({
        loggedInUser: authorId,
        userInfos: allUsersInfo
    })
}

//NOTE: Dont Destructure the Document Object i.e ...userInfo [in below case], It returns a lot of unnecessary data, use it directly or extract data from it.

//Fetch a Single User detail..
const fetchUserDetails = async (req, res) => {
    
    //extract the authorId from req.body coming from authMiddleware...
    const {authorId} = req.body;
    const userInfo  = await getUserById(authorId);

    // check if we get a user ?
    if(!userInfo) {
        return res.status(404).json({
            message: 'User Not Found'
        }).end();
    } 
    //If we get a user, Send it to Client..
    return res.status(200).json(userInfo).end();
}

//Update User details.
const updateUserDetails = async (req,res) => {
    
    //extract the mandatory fields from API body and authorId [from authMiddleware] from req.body...
    const{firstName, lastName, email, authorId, accountType, contact, location, profileUrl, resumeUrl, jobTitle, about} = req.body;

    //Field Validation Check...
    if(!firstName || !lastName || !email) {
        return res.status(404).json({
            message: 'Field Validation Failed'
        }).end();
    }

    //Check if the user Exists in the DB...
    const userInfo = await getUserById(authorId);
    if(!userInfo) {
        return res.status(404).json({
            message: 'User Not Found'
        }).end();
    }

    //If all above validation passes, update the user with the data and update it..
    const newUserData = await updateUserById(userInfo._id, {
        firstName,
        lastName,
        email,
        accountType,
        contact,
        location,
        profileUrl,
        resumeUrl,
        jobTitle,
        about,
    });
    return res.status(200).json(newUserData).end();
}

export {
    fetchAllUsers,
    fetchUserDetails,
    updateUserDetails,
}