// Handles Errors from Routes Controller...
// NOTE: err Obj will contain the name and message of the error occured.
const errorHandler = (err, req, res, next) => {
    console.log('###Error Found:', err);
    res.status(500).json({
        message: 'Internal Error Occured',
        errorMsg: err
    })
}

export default errorHandler;