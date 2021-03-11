class AppError {
    message: string | string[];
    statusCode: number;

    constructor(message: string | string[], statusCode: number = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }


}

export { AppError }