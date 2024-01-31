// NOTE: Create, update and delete job should happen only if the loggedin User is a Company.[ Middleware ]

import { addJob } from "../models/jobModel.js";

//1.Create new Jobs for a Company. [NOTE: new Job Added -> Add that Job to the loggedin Company  -> post hook added on 'Save' Operation in JobSchema]
const createJob = async (req, res) => {
    //extract the details from req body...
    const {jobTitle, jobType, location, salary, experience} = req.body;

    //Field Validation...
    if(!jobTitle || !jobType || !location || !salary || !experience) {
        return res.status(404).json({
            message: 'Field Validation Failed'
        }).end();
    }
    const company = req.body.authorId; //Added from the isAuthenticated Middleware from the loggedIn Company User.
    if(!company) {
        return res.status(404).json({
            message: 'Job Must be Linked to a Company'
        }).end();
    }

    const{vacancies, desc, requirements, applicants} = req.body;
    // create the job data...
    const job = await addJob({
        jobTitle,
        jobType,
        location,
        salary,
        experience,
        about: {desc, requirements},
        company,
        applicants
    });
    return res.status(201).json(job).end();
};

//2.Update Jobs for a Company by JobId
const updateJobInfoById = async (req, res) => {};

//3.Fetch Jobs details by jobId
const fetchJobDetailsById = async (req, res) => {};

//4.Delete Jobs details by jobId
const deleteJobDetailsById = async (req, res) => {};

export {
    createJob,
    updateJobInfoById,
    fetchJobDetailsById,
    deleteJobDetailsById
}