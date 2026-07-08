class ApiError extends Error {
    constructor(
        statusCode,
        message :"Something Went Wrong",
        error = [],
        stack = ""

    ){
        super(message),
        this.statusCode = statusCode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors =error

        if (stack) {
            this.stack =stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
        
    }
}
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}