var express = require('express');
var router = express.Router();

const OrderController = require('../controlers/shopOrder_controler');

router.use('/info', OrderController.orderInfo)
router.use('/addOrder', OrderController.addOrder)
router.use('/addProduct', OrderController.addProduct)
router.use('/getOrder', OrderController.getOrder)
router.use('/getProducts', OrderController.getProducts)
router.use('/orderInfo', OrderController.orderInfo)
router.use('/updateOrder', OrderController.updateOrder)
router.use('/deleteOrder', OrderController.deleteOrder)
module.exports = router;