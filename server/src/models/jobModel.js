import { Schema, mongoose } from "./index.js";

//Defining JobSchema
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type:String,
        required:[true, 'JobTitle is required']
    },
    jobType: {
        type:String,
        enum: ['Full-Time',
        'Part-Time',
        'Contract',
        'Intern',
        ],
        required: [true, 'Job Type is Required']
    },
    location: {type:String, required: [true, 'Location is Required']},
    salary: {type:Number, required: [true, 'Salary is Required']},
    vacancies: Number,
    experience: {type:Number, required: [true, 'Experince is Required']},
    about: {
        desc:String,
        requirements:String
    },
    company: {
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
    application:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},
{  
    timestamps: true 
});

//define the jobModel..
const JobModel = mongoose.model('Job', jobSchema);

export {
    JobModel
}