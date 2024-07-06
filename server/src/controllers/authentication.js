import { fetchCompanyByEmailId, registerCompany } from "../models/companyModel.js";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { createToken, generateSalt, parsePassword } from "../utils/authHelper.js";

// Register a new user...
const register = async (req, res, next) => {
    const {
        firstName, lastName, email, password, 
        accountType, contact, location, profileUrl, jobTitle, 
        about
    } = req.body;

    // Field validation...
    if(!firstName || !lastName || !email || !password) {
        // return next('Field Validation Failed !');
        return res.status(400).json({
            message: 'Field Validation Failed'
        });
    }

    //Check if the user already Exist ?
    const user = await getUserByEmail(email);
    if(user) {
        // return next('User already Exist');
        return res.status(403).json({
            message:'Email Id must be unique'
        })
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
    const token = createToken(newUser._id);
    return res.status(201).json({
        message: 'user Successfully created',
        token,
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
    }).end();
}

//Login Controller...
const doLogin = async (req, res, next) => {
    
    //Field Validation:
    const{email, password} = req.body;

    if(!email || !password) {
        // return next('Either Email or Password is mandatory');
        return res.status(404).json({
            message:'EmailId and Password are Mandatory'
        })
    }

    //Verify the Login... [NOTE: salt is bydefault select false in schema i.e it wont come, until you specifically mention]
    const user = await getUserByEmail(email).select('+authentication');
    // console.log('######1', user);
    // console.log('######1', parsePassword(password, user?.authentication?.salt));
    // console.log('######1', user?.authentication?.password);
    if(!user || parsePassword(password, user?.authentication?.salt) !== user?.authentication?.password) {
        // return next('Either Email or password is Invalid');
        return res.status(401).json({
            message:'Either EmailId or Password is Invalid'
        })
    }
    const token = createToken(user._id);
    return res.status(200).json({
        message: 'Login Successful',
        token,
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }).end();
}

//REgister a new Company...
const companyRegister = async (req, res, next) => {
    const{ name, email, password } = req.body;

    // Check for mandatory Field Validation...
    if(!name || !email || !password) {
        return res.status(404).json({
            message: 'Field Validation Failed'
        }).end();
    }

    //Check for duplicate emailId...
    const companyInfo = await fetchCompanyByEmailId(email);
    if(companyInfo) {
        return res.status(403).json({
            message: 'EmailId must be unique'
        }).end();
    }

    //create a new Company Document...
    const salt = generateSalt();
    const {contact, location, profileUrl, about, jobPosts} = req.body;
    const newCompany = await registerCompany({
        name,
        email,
        authentication: {
            password: parsePassword(password, salt),
            salt
        },
        contact, location, profileUrl, about, jobPosts
    })
    newCompany.token = createToken(newCompany._id);
    newCompany.message = 'Company SuccessFully Created';
    return res.status(201).json(newCompany).end();
}

// Login with Company cred...
const doCompanyLogin = async (req, res) => {
    //Field Validation...
    const{email, password} = req.body;

    console.log('###Payload', req.body);

    if(!email || !password) {
        return res.status(404).json({
            message: 'EmailId and Password are Mandatory'
        }).end();
    }

    //Check for email registered or not ?
    const companyInfo = await fetchCompanyByEmailId(email).select('+authentication');
    const isPasswordValid = companyInfo ? (parsePassword(password, companyInfo?.authentication?.salt) === companyInfo?.authentication?.password) : false;
    
    if(!companyInfo || !isPasswordValid) {
        return res.status(401).json({
            message: 'Either EmailId or Password is Invalid'
        }).end()
    }

    //If password Check's Out, Loggedin the Company...
    const token = createToken(companyInfo?._id);
    return res.status(200).json({
        message: 'Login Successful',
        token,
        _id: companyInfo._id,
        email:companyInfo.email,

    }).end();
}

export {
    register,
    doLogin,
    companyRegister,
    doCompanyLogin,
}