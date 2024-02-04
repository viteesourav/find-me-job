import { fetchCompanyById } from "./companyModel.js";
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
        ref:'Company',
        required: true
    },
    applicants:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},
{  
    timestamps: true 
});

// Defining Jobs post save() hook: [After new Job added, It must add the jobId to Company's Record]
jobSchema.post('save', async(jobRecord, next) => {
    console.log('#####Job_Middleware_postSave: ', jobRecord);
    // Extract the companyId from newJob Response...
    const companyId = jobRecord?.company;
    //Fetch the companyInfo by companyId
    let companyinfo = await fetchCompanyById(companyId);
    if(!companyinfo) next('CompanyId is Invalid');
    companyinfo.jobPosts.push(jobRecord._id); // Push the new Job ID to the company's JobPosts.
    await companyinfo.save();  //save the Company's Updated Information.
    next();
})

//define the jobModel..
const JobModel = mongoose.model('Job', jobSchema);

//CRUD Layer supporting Mongo Operations...
const addJob = (payload) => new JobModel(payload).save().then(obj => obj.toJSON());
const updateJobById = (id, payload) => JobModel.findByIdAndUpdate(id, payload, {new: true}); //adding new returns the updated Record.
const findJobById = (id) => JobModel.findById(id);

export {
    JobModel,
    addJob,
    updateJobById,
    findJobById,
}