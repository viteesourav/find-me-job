import { mongoose, validator, Schema } from './index.js'

//creating Compnay schema...
const companySchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Company Name is Mandatory'],
    },
    email: {
        type:String,
        required: [true, 'Company Email is Mandatory'],
        unique: true,
        validate:validator.isEmail
    },
    authentication: {
        password: {
            type:String,
            required: true,

        },
        salt: {
            type:String,
            select: false,
        }
    },
    contact: {type:String},
    location: {type:String},
    profileUrl: {type:String},
    about: {type:String},
    jobPosts: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }
},
    {timestamps: true}
);

//create the Model...
const CompanyModel = mongoose.model('Company', companySchema);

export {
    CompanyModel,
}