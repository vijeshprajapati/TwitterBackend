import { check } from "express-validator";

const createUserValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Inavalid Email').isEmail().normalizeEmail({
         gmail_lowercase : true,
         gmail_remove_dots : false
        }),
    check('username', 'Username is required').not().isEmpty()
];

export default createUserValidation;