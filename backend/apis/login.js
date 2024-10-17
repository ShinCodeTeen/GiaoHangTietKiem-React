var express = require('express');
var router = express.Router();

const LoginController = require('../controlers/login_controler');

router.use('/shop', LoginController.shopLogin)
router.use('/ship', LoginController.shipLogin)
router.use('/admin', LoginController.adminLogin)
router.use('/register', LoginController.accountRegister)
module.exports = router;
