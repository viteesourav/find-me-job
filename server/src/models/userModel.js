import { mongoose, validator } from './index.js'

//create the schema for user...
//NOTE: Note the way we handles select for nested objects in authentication key.. [*** VIMP ***]
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Eamil is Required'],
        unique: true,
        validate:validator.isEmail
    },
    authentication: {
        type: {
            password: {
                type:String,
                required: true,
            },
            salt: {
                type:String,
                required: true,
            },
        },
        select:false
    },
    accountType: {type: String, default: 'Seeker'},
    contact: {type:String},
    location: {type:String},
    profileUrl: {type:String},
    jobTitle: {type:String},
    about: {type:String},
},
    {timestamps: true}
);
//NOTE: the last timestamp Object addes 2 extra properties, createdAt, updatedAt.


const UserModel = mongoose.model('User', userSchema);

// UserModel CRUD Operations...
const createUser = (newUser) => new UserModel(newUser).save().then(user => user.toJSON());
const getUserById = (id) => UserModel.findById(id);
const getUserByEmail = (email) => UserModel.findOne({email});
const getAllUsers = () => UserModel.find();
const updateUserById = (id, userObj) => UserModel.findByIdAndUpdate(id, userObj, {new: true});

export {
    UserModel,
    createUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    updateUserById
}