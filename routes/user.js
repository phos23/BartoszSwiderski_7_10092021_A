const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user');

router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.displayProfile);
router.put('/update/', auth, userCtrl.updateProfile);
router.put('/password/', userCtrl.changePassword);

module.exports = router