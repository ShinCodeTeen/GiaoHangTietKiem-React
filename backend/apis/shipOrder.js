var express = require('express');
var router = express.Router();

const OrderController = require('../controlers/shipOrder_controler');
router.use('/getOrder', OrderController.getOrder)
router.use('/getShipOrder', OrderController.getShipOrder)
router.use('/getProducts', OrderController.getProducts)
router.use('/orderInfo', OrderController.orderInfo)
router.use('/receiveOrder', OrderController.receiveOrder)
router.use('/completeOrder', OrderController.completeOrder)
router.use('/getKlOrder', OrderController.getKLOrder)
module.exports = router;