const loginRouter = require('./login')
const userInfoRoute = require('./userInfo')
const shopOrderRoute = require('./shopOrder')
const shipOrderRoute = require('./shipOrder')
const statisticalRoute = require('./statistical')
const AdminStatis = require('./admin_statis')
const AdminMana = require('./adminManager')
function apis(app){
    app.use('/login',loginRouter)
    app.use('/userInfo',userInfoRoute)
    app.use('/shopOrder',shopOrderRoute)
    app.use('/shipOrder',shipOrderRoute)
    app.use('/statistical',statisticalRoute)
    app.use('/adminStatis',AdminStatis)
    app.use('/adminManager',AdminMana)
}
module.exports = apis;