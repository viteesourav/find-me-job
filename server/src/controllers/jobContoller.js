// NOTE: Create, update and delete job should happen only if the loggedin User is a Company.[ Middleware ]

import { JobModel, addJob, findJobById, updateJobById } from "../models/jobModel.js";

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
        vacancies,
        salary,
        experience,
        about: {desc, requirements},
        company,
        applicants
    });
    return res.status(201).json(job).end();
};

//2.Update Jobs for a Company by JobId [using findByIdAndUpdate -> only updates the fields that are passed]
const updateJobInfoById = async (req, res) => {
    //extract the details from req body...
    const {jobTitle, jobType, location, salary, experience} = req.body;
    const {id} = req.params; //extract the jobId.

    //Field Validation...
    if(!jobTitle || !jobType || !location || !salary || !experience) {
        return res.status(404).json({
            message: 'Field Validation Failed'
        }).end();
    }

    const{vacancies, desc, requirements, applicants} = req.body;
    const resp = await updateJobById(id, {
        jobTitle,
        jobType,
        location,
        vacancies,
        salary,
        experience,
        about: {desc, requirements},
        applicants
    }).populate({
        path: 'company',
        select: '-jobPosts'
    });
    // NOTE: Here select: '-jobPosts' will not include jobPosts field for company's populated data.
    if(!resp) return res.status(404).json({
        message: 'Job Doesnot Exits'
    })
    return res.status(200).json(resp).end();
};

//3.Fetch all Jobs and filter based on query Params.[search[JobTitle], location, jobType, exp]
const fetchJobs = async (req, res) => {
    // fetch query params...
    const{search, location, jobType, exp, sort, page, limit} = req.query;
    
    let queryObj = {};

    if(search) {
        queryObj.jobTitle = {$regex: search, $options: 'i'};  // Case-insensitive search
    }

    if(location) {
        queryObj.location = {$regex: location, $options: 'i'};
    }

    if(jobType) {
        const jobTypeFilter = jobType.split(','); //Full-Time, Contract, Intern
        queryObj.jobType = {$in: jobTypeFilter};
    }

    if(exp) {
       const expFilter = exp.split('-'); //3-4
       const expQuery =  { 
        $and: [
        {experience: {$gte: expFilter[0]}},
        {experience: {$lte: expFilter[1]}},
       ]} 
       queryObj = {...queryObj, ...expQuery};
    }
    // NOTE: the above one can be written as: queryObj.experience = {$gte: expFilter[0], $lte: expFilter[1]};

    // Now that we have queryObj Ready, we can query the DB...[NOTE: not using await, we will do later]
    let queryResp = JobModel.find(queryObj).populate({
        path: 'company',
        select: '-jobPosts'
    });

    // Sorting the JobData...
    switch(sort) {
        case 'Newest':
            queryResp = queryResp.sort('-createdAt');
            break;
        case 'Oldest':
            queryResp = queryResp.sort('createdAt');
            break;
        case 'A-Z':
            queryResp = queryResp.sort('jobTitle');
            break;
        case 'Z-A':
            queryResp = queryResp.sort('-jobTitle');
    }

    // Pagination...
    const totalJobs = await JobModel.countDocuments(queryResp); //Retruns the count of all Jobs with including above filters.
    const pageNo = page ?? 1;
    const maxRecords = limit ?? 1;
    const noOfPages = Math.ceil(totalJobs/maxRecords);

    queryResp = queryResp.limit(pageNo * maxRecords);

    //Now as we have done all modifications on the query, lets execute it...
    let jobs = await queryResp; //using await, It will return all the filtered list of docs.

    return res.status(200).json({
        message: 'Fetch All Jobs Successful',
        pageNo,
        total: totalJobs,
        noOfPages,
        jobs
    }).end();
};

//3.Fetch Jobs details by jobId [ NOTE: also find Similar jobs, having same jobTitle or salary or job-type or exp ]
const fetchJobDetailsById = async (req, res) => {
    // Lets get the id of the job..
    const{id} = req.params;

    //if job exists
    const job = await findJobById(id).populate({
        path: 'company',
        select: '-jobPosts'
    });

    if(!job) {
        return res.status(404).json({
            message: 'Job deosnot exist'
        }).end();
    }

    // Need to find similar Jobs, based on jobTitle, location, jobTypes and exp..
    const queryObj = {
        $or: [
            {jobTitle: {$regex: job.jobTitle, $options: 'i'}},
            {jobType: job.jobType},
            {location: job.location},
            {experience: job.experience}
        ]
    };

    let queryRes = JobModel.find(queryObj).populate({
        path: 'company',
        select: '-jobPosts'
    }).sort({createdAt: -1});

    const similarJobs = await queryRes.limit(6); // Find only 6 similar jobs.


    return res.status(200).json({
        message: 'Job Found Successfully',
        job,
        similarJobs
    }).end();
};

//4.Delete Jobs details by jobId
const deleteJobDetailsById = async (req, res) => {
    //Extract the Id...
    const{id} = req.params;

    //Check if the Job exisits ?
    const job = await findJobById(id);

    if(!job) {
        return res.status(404).json({
            message: 'Job doesnot exits'
        }).end();
    }

    const jobInfo = await JobModel.findByIdAndDelete(job._id);
    return res.status(200).json({
        message: 'Job deleted successfully',
        jobInfo
    })
};

export {
    createJob,
    updateJobInfoById,
    fetchJobs,
    fetchJobDetailsById,
    deleteJobDetailsById
}