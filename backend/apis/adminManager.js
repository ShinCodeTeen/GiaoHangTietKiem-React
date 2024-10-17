var express = require('express');
var router = express.Router();

const AdminControler = require('../controlers/adminMana_controler');

router.use('/getshops', AdminControler.getShops)
router.use('/getshopbyid', AdminControler.getShopById)

router.use('/getships', AdminControler.getShips)
router.use('/getshipbyid', AdminControler.getShipById)

router.use('/getshipregister', AdminControler.getShipRegisters)
router.use('/getregisterbyid', AdminControler.getShipRegisterById)
router.use('/updateregister', AdminControler.updateRegisterStatus)

router.use('/suspenduser', AdminControler.suspendUser)
router.use('/unsuspenduser', AdminControler.unSuspendUser)

router.use('/addshipper', AdminControler.addShipper)

module.exports = router;