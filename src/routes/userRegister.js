const express = require('express');
const router = express.Router();
const { validateRegistration, validateLogin, validateUpdate } = require('../middlware/Validator');
const { userRegistration,userLogin, getPref, updatePref } = require('../controller/userController');
const { verifyToken } = require('../middlware/verifyToken');

router.post('/register', validateRegistration, userRegistration);
router.post('/login', validateLogin, userLogin);

router.get('/preferences',verifyToken , getPref);
router.put('/preferences', validateUpdate,verifyToken, updatePref);
router.get('/news', verifyToken, updatePref);



module.exports = router;
