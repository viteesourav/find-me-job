// This takes the controller function as param.
//Executes the function and handles catch scenario...[It catches the errors during execution of controller function]
//NOTE: Alternatively, We can use try and catch block in every controller function to catch error, But this is cool way to handle all catch block at once.

const catchAsync = controllerFun => {
    return (req,res,next) => {
        controllerFun(req,res,next).catch(next); //If any errors in controller func, catch will pass the encountered err as param next, which triggers the errorHandling Middleware.
    }
}

export default catchAsync;