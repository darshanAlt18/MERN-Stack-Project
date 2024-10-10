const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
const { signupSchema, loginSchema, contactSchema } = require('../validations/userValidation');
const validate = require('../middlewares/validate_middleware');

// router.route('/home').get((req,res)=>{
//     res.status(200).send("Welcome to Home Page!!");
// })

router.route('/').get(controller.home);
router.route('/about').get(controller.about);
router.route('/register').post(validate(signupSchema), controller.register);
router.route('/login').post(validate(loginSchema), controller.login);
router.route('/contact').post(validate(contactSchema),controller.contactForm);

module.exports = router;