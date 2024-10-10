const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const Error_message = err.Error_message || "Something went Wrong on the server.Please try again.";
    const autualError = err.autualError || "A server-side error occurred";

    console.error(`Status : ${status} , Message : ${Error_message} , Error : ${autualError}`);

    return res.status(status).json({
        Error_message,
        autualError: status === 500 ? err.stack : autualError
    });
}
module.exports = errorMiddleware;