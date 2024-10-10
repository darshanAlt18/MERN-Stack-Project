const schema = require('../validations/userValidation');

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (e) {
        // console.log(e);
        const status = 422;
        const Error_message = "Invalid Input Data"
        const autualError = e.errors[0].message || "Validation failed";

        const error = {
            status,
            Error_message,
            autualError
        };
        // console.log("Validation Error", error);
        next(error);
        // res.status(400).json({ ErrorMsg: Message });
    }
}
module.exports = validate;