const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang' 
});
db.connect();
class AdminController {
   
    countShipperAC(req, res) {
        const sql = "SELECT COUNT(userid) as slShipper FROM useraccount WHERE type= '1' "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, countShipper: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    countShopAC(req, res) {
        const sql = "SELECT COUNT(userid) as slShop FROM useraccount WHERE type= '0' "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, countShop: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    countShopActivate(req, res) {
        const sql = "SELECT COUNT(DISTINCT userac.userid) AS slShopActivate FROM useraccount AS userac JOIN donhang AS dh ON userac.userid = dh.mashop AND userac.type ='0';"; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, activateShop: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    countShipActivate(req, res) {
        const sql = "SELECT COUNT(DISTINCT userac.userid) AS slShipActivate FROM useraccount AS userac JOIN donhang AS dh ON userac.userid = dh.mashipper AND userac.type ='1';"; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, activateShip: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    totalOrder(req, res) {
        const sql = "SELECT COUNT(id) as tongdon FROM donhang "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, totalOrder: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    totalProduct(req, res) {
        const sql = "SELECT COUNT(sl) as tongSP FROM sanpham "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, totalProduct: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    totalCoD(req, res) {
        const sql = "SELECT SUM(tongtien) as tongCoD FROM donhang "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, totalCoD: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    totalShippingFee(req, res) {
        const sql = "SELECT Sum(phiship) as tongShip FROM donhang "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, totalShippingFee: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    shippedOrder(req, res) {
        const sql = "SELECT COUNT(id) as slShippedOrder FROM donhang where trangthai ='-1'"; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, shippedOrder: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    waitOrder(req, res) {
        const sql = "SELECT COUNT(id) as slWaitOrder FROM donhang  where trangthai ='1'"; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, waitOrder: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    shippingOrder(req, res) {
        const sql = "SELECT COUNT(id) as slShippingOrder FROM donhang where trangthai ='0'"; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, shippingOrder: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
   
}
module.exports = new AdminController
