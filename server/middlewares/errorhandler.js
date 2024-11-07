//middleware refers to functions that execute during the lifecycle of a request to the server, 
//before the final request handler is executed.
// Middleware functions can modify the request (req) and response (res) objects, end the request-response cycle,
// or call the next middleware in the stack.
const {constants} = require("../constants");
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res. //? : ternary operators
    statusCode : 500;
    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validatoin Failed",
                message: err.message,
                statckTrace: err.stack, //stackTrace - helping developers trace back through the execution flow to find the source of an error.

            });

            break;
            case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                statckTrace: err.stack,
            });
            case constants.UNAUTHORIZED:
                res.join({
                    title:"Unauthorized",
                    message: err.message,
                    statckTrace :err.stack,
                });
            case constants.SERVER_ERROR:
                res.json({
                    title: "Server Error",
                    message: err.message,
                    statckTrace: err.stack,
                });
            
                default:
                    console.log("No error , All Good!");
                    break;

    }
};

module.exports = errorHandler;