class ApiError extends Error {
    public statusCode: number;
    public success: boolean;
    public errors: any[];

    constructor(
        statusCode: number,
        message = "Something went wrong",
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
