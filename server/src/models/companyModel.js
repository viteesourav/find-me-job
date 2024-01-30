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
        type: {
            password: {
                type:String,
                required: true,
    
            },
            salt: {
                type:String,
                required: false,
            }
        },
        select: false
    },
    contact: {type:String},
    location: {type:String},
    profileUrl: {type:String},
    about: {type:String},
    jobPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
},
    {timestamps: true}
);

//create the Model...
const CompanyModel = mongoose.model('Company', companySchema);

//CRUD Operations on CompanyModel...
const fetchAllCompanies = () => CompanyModel.find();
const fetchCompanyByEmailId = (email) => CompanyModel.findOne({email});
const registerCompany = (companyObj) => new CompanyModel(companyObj).save().then(resp => resp.toJSON());

export {
    CompanyModel,
    fetchAllCompanies,
    fetchCompanyByEmailId,
    registerCompany,
}