import axios from 'axios';

//const Error Codes Handling...
const ERROR_CODES = [
    401,
    403
]

//create a Axios Instance...
const API_Instance = axios.create({
    baseURL: 'http://localhost:8080/api-v1/',
    responseType: 'json'
})

//handles backend service calls...
const dbConnection = async ({url, method, data, token}) => {
    try {
        const resp = await API_Instance({
            url,
            method: method || 'GET',
            data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ''
            }
        });

        return resp;
    } catch (err) {
        console.log('###Error while fetching data', err?.message);
        return err;
    }
}

//handles File uploads to cloudinary... --> Connects to cloudinary to handle files.
const handleFileUploads = async(payload) => {
    const cloudinary_url = 'https://api.cloudinary.com/v1_1/dt5g032wn/image/upload';
    let frmPayload = new FormData();
    frmPayload.append("file", payload);
    frmPayload.append("upload_preset", "jobsphere");
    try {
        const resp = await axios.post(
            cloudinary_url, 
            frmPayload
        );
        return resp?.data?.secure_url;
    } catch(err) {
        console.log('###Failed to upload file', err);
        return {
            err
        }
    }
}

//While we run Filters, we need to update the url with the search query...
const updateUrl = ({
    navigate,
    currpageLocation,
    pageNum,
    searchQuery,
    joblocation,
    sort,
    jobType,
    exp
}) => {

    const params = new URLSearchParams();

    (pageNum && pageNum > 1) && params.set("page", pageNum);
    (searchQuery) && params.set("search", searchQuery);
    (joblocation) && params.set("location", joblocation);
    (sort) && params.set("sort", sort);
    (jobType && jobType?.length > 0) && params.set("jobType", jobType);   //Since JobType is [], we need to check if 'JobType' key exists and if it exits, It cannot be empty []
    (exp) && params.set("exp", exp);

    const redirectUrl = `${currpageLocation.pathname}?${params.toString()}`;
    
    navigate(redirectUrl, {replace: true});  //you naviagte to the destination page..

    return redirectUrl;
}

export {
    dbConnection,
    handleFileUploads,
    updateUrl,
    ERROR_CODES
}