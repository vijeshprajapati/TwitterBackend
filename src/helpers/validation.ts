import { check } from "express-validator";

export const createUserValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Inavalid Email').isEmail().normalizeEmail({
         gmail_lowercase : true,
         gmail_remove_dots : false
        }),
    check('username', 'Username is required').not().isEmpty()
];

export const updateUserValidation = [
    check('name', 'Name is required').not().isEmpty()
];

export const createTweetValidation = [
    check('content', 'Content is required').not().isEmpty(),
    check('userId', 'UserId is required').not().isEmpty()
];

export const updateTweetValidation = [
    check('content', 'Content is required').not().isEmpty()
];

// export default updateUserValidation;
// export default { createUserValidation, updateUserValidation };