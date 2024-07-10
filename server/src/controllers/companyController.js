import { CompanyModel, fetchCompanyById } from "../models/companyModel.js";

//1. Fetch the details of company based on the loggedIn CompanyProfileId
const fetchCompanyProfile = async (req, res) => {
    //Fetch the AuthorID from the Authentication Token...[authentication Middleware handling it]
    const{authorId} = req.body;
    const companyInfo = await fetchCompanyById(authorId).populate('jobPosts');

    if(!companyInfo) {
        return res.status(404).json({
            message: 'Company Not Found'
        }).end();
    }

    //If Company Exists, Send the data to client..
    return res.status(200).json(companyInfo).end();
};
//2. Update the details of the Company based on the loggedIn CompanyProfileId
// NOTE: Here, we are using classic .save() method to update the Document. [This way of implementation the mongoose middleware and validation]
const updateCompanyProfile = async (req, res) => {
    //Mandatory Field Validation..
    const{name, email, authorId} = req.body;

    if(!name || !email) {
        return res.status(400).json({
            message: 'Field Validation Failed'
        }).end()
    }

    const {contact, location, profileUrl, about, jobPosts} = req.body;
    
    //Fetch Company details using Author Id...
    const company = await fetchCompanyById(authorId);

    // NOTE: We using the nullify Operator to update only the values which the user giving in the update Payload.
    // NOTE: Need to do this step only when you use .save(), Operations like findByIdAndUpdate() -> Handles it automatically.
    company.contact = contact ?? company.contact;  //Baiscally if contact is null, whatever stored paste the same [using nullify check]
    company.name = name ?? company.name; 
    company.location = location ?? company.location;
    company.profileUrl = profileUrl ?? company.profileUrl;
    company.about = about ?? company.about;
    company.jobPosts = jobPosts ?? company.jobPosts;
    
    //save the compnay info..
    const resp = await company.save();
    return res.status(200).json({
        message: 'Company Info Updated Successfully',
        _id: resp._id,
        email:resp.email,
        name: resp.name,
        profileUrl: resp.profileUrl,
        jobPosts: resp.jobPosts,
        createdAt: resp.createdAt
    }).end();
};
//3. fetchAllCompanies.
//NOTE: Here, we will be using query chaining and we will fetch All Companies info based on Applied Query Filter
const fetchAllCompanies = async (req, res) => {
    //Get the Filtered Items from the req Query..
    const{search, sort, location, page, limit} = req.query;

    // Building a Query Object to use for searching...
    let queryObj = {};

    if(search) {
        queryObj.name = {$regex: search, $options: 'i'}; //here i -> case insensative search
    }

    if(location) {
        queryObj.location = {$regex: location, $options: 'i'}; //here i -> case insensative search
    }

    // Get the document query [Dont use await, we will execute the query later]
    let queryResp = CompanyModel.find(queryObj);

    // Handling Sorting..
    // NOTE: Here -CreatedAt i.e Descending Order and CreatedAt i.e Ascending Order.
    switch(sort) {
        case 'Newest':
            queryResp = queryResp.sort('-createdAt');
            break;
        case 'Oldest':
            queryResp = queryResp.sort('createdAt');
            break;
        case 'A-Z':
            queryResp = queryResp.sort('name');
            break;
        case 'Z-A':
            queryResp = queryResp.sort('-name');
    }

    // console.log('#####queryResp: ', queryResp); -> It Returns the whole details of the Collection.

    // Pagination..
    const totalCompanies = await CompanyModel.countDocuments(queryResp);  //Find Total Records we are fetching...
    const pageNo = page ?? 1;
    const maxRecords = limit ?? 20;
    const noOfPages = Math.ceil(totalCompanies/maxRecords);

    queryResp = queryResp.limit(pageNo * maxRecords);

    //Now as we have done all modifications on the query, lets execute it...
    let companies = await queryResp; //This is same as doing await CompanyModel.find().sort().limit() --> await quereyRes where queryRes is CompanyModel.find().sort().limit();

    // NOTE: You do the above approach when you want to chain conditional query Method and at the end execute it.

    return res.status(200).json({
        message: 'Fetch All Companies Successful',
        pageNo,
        total: totalCompanies,
        noOfPages,
        companies
    }).end();
};
// 4. Get CompanyInfo by compnayId as path param.
const fetchCompanyInfoById = async (req, res) => {
    // Fetch the params from url.
    const{id} = req.params;
    const companyInfo = await fetchCompanyById(id).populate({
        path: 'jobPosts',
        populate: {
            path: 'company'
        }
    });

    if(!companyInfo) {
        return res.status(404).json({
            message: 'Company Not Found'
        }).end();
    }

    //If Company Exists, Send the data to client..
    return res.status(200).json(companyInfo).end();
};

//5. FetchAllJobs For a company with filter Option for sort and location.
const fetchAllCompanyJobs = async (req, res) => {
    // Extract the query Params...
    const{location, sort} = req.query;
    const {authorId} = req.body;
    let queryObj = {};

    if(location) {
        queryObj.location = {$regex: location, $options: 'i'};
    }

    // Handling Sorting..
    // NOTE: Here -CreatedAt i.e Descending Order and CreatedAt i.e Ascending Order.
    let sorting = '';
    switch(sort) {
        case 'Newest':
            sorting = '-createdAt';
            break;
        case 'Oldest':
            sorting = 'createdAt';
            break;
        case 'A-Z':
            sorting = 'name';
            break;
        case 'Z-A':
            sorting = '-name';
    }

    // Lets work with query...[Will build the query without await and execute it later]
    // Here sort and match works on the populated Job data from a particular company..
    let queryResp = CompanyModel.findById(authorId).populate({
        path: 'jobPosts',
        sort: sorting,
        match: queryObj
    });

    //Execute the queryResp...
    const CompanyInfo = await queryResp;

    return res.status(200).json({
        message: 'Company Jobs Fetch Successful',
        company: CompanyInfo
    });
};

export { 
    fetchCompanyProfile, 
    updateCompanyProfile,
    fetchAllCompanies,
    fetchCompanyInfoById,
    fetchAllCompanyJobs
}