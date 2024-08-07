import crypto from 'crypto'
import { jwt } from '../models/index.js';

const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//Function to generate random 128-bit string...
const generateSalt = () => crypto.randomBytes(128).toString('base64');

//function to parse the password...
const parsePassword = (password, salt) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(CRYPTO_SECRET_KEY).digest('hex');
}

//Funtion to create jwt --> Contains LoggedIn UserID and valid for 30 mins
const createToken = (id) => {
    return jwt.sign(
        {
            authorId: id
        },
        JWT_SECRET_KEY,
        {
            expiresIn: '30m'
        }
    )
}

export {
    generateSalt,
    parsePassword,
    createToken,
    JWT_SECRET_KEY,
}