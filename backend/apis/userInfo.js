var express = require('express');
var router = express.Router();

const InfoController = require('../controlers/info_controler');

router.use('/user', InfoController.userInfo)

router.use('/admin', InfoController.adminInfo)
router.use('/updateInfo', InfoController.updateInfo)
router.use('/updatePassword', InfoController.updatePassword)
module.exports = router;
