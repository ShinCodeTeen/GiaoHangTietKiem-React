var express = require('express');
var router = express.Router();

const AdminControler = require('../controlers/adminStatis_controler');

router.use('/shopac', AdminControler.countShopAC)
router.use('/shipac', AdminControler.countShipperAC)

router.use('/shopActivate', AdminControler.countShopActivate)
router.use('/shipActivate', AdminControler.countShipActivate )

router.use('/waitOrder', AdminControler.waitOrder)
router.use('/shippingOrder', AdminControler.shippingOrder)
router.use('/shippedOrder', AdminControler.shippedOrder)
router.use('/totalOrder', AdminControler.totalOrder)
router.use('/totalProduct', AdminControler.totalProduct)

router.use('/totalCoD', AdminControler.totalCoD)
router.use('/totalShippingFee', AdminControler.totalShippingFee)
module.exports = router;