const z = require('zod');

const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must contain at least 3 characters" })
        .max(15, { message: "Username must not exceed 15 characters." }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Please Enter a valid email address" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(3, { message: "Password must contain at least 3 characters" })
        .max(15, { message: "Password must not exceed 15 characters." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/\d/, { message: "Password must contain at least one number." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
});

const loginSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(1, { message: "Username cannot be empty" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(1, { message: "Password cannot be empty" }),
});
const contactSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(1, { message: "Name cannot be empty" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Please enter a valid email address." }),
    message: z
        .string({ required_error: "Message is required" })
        .trim()
        .min(1, { message: "Message cannot be empty" }),
});


module.exports = { signupSchema, loginSchema, contactSchema };

