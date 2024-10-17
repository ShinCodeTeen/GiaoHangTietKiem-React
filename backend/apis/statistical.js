var express = require('express');
var router = express.Router();

const StatisticalController = require('../controlers/statistical_controler');

router.use('/waitOrder', StatisticalController.waitOrder)
router.use('/shippingOrder', StatisticalController.shippingOrder)
router.use('/shippedOrder', StatisticalController.shippedOrder)
router.use('/countWait', StatisticalController.countWaitProduct)
router.use('/countShipping', StatisticalController.countShippingProduct)
router.use('/countShipped', StatisticalController.countShippedProduct)
router.use('/sumShip', StatisticalController.sumShip)

module.exports = router;
