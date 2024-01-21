// Handles Errors from Routes Controller...
const errorHandler = (err, req, res, next) => {
    console.log('###Error Found:', err);
    res.status(500).json({
        message: 'Internal Error Occured'
    })
}

export default errorHandler;