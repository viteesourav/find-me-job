import crypto from 'crypto'
import { jwt } from '../models/index.js';

const CRYPTO_SECRET_KEY = 'This is a secret 5653625432436766';
const JWT_SECRET_TOKEN = 'This is a secret 34563546345364';

//Function to generate random 128-bit string...
const generateSalt = () => crypto.randomBytes(128).toString('base64');

//function to parse the password...
const parsePassword = (password, salt) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(CRYPTO_SECRET_KEY).digest('hex');
}

//Funtion to create jwt
const createToken = (id) => {
    return JWT.sign(
        {
            authorId: id
        },
        JWT_SECRET_TOKEN,
        {
            expiresIn: '1d'
        }
    )
}

export {
    generateSalt,
    parsePassword,
    createToken,
}