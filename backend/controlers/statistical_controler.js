const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang' 
});
db.connect();
class StatiscalController {
    
    waitOrder(req, res) {
        const sql = "SELECT COUNT(dh.id) AS slCho, SUM(dh.tongtien) AS tongCoDCho FROM `donhang` as dh WHERE dh.trangthai= '1' and dh.mashop = ?"; 
        const value_req =[
            req.body.userid
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
        const sql = "SELECT COUNT(dh.id) AS slShip, SUM(dh.tongtien) AS tongCoDShip FROM `donhang` as dh WHERE dh.trangthai= '0' and dh.mashop = ?"; 

        const value_req =[
            req.body.userid
          
           
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
    shippedOrder(req, res) {
        const sql = "SELECT COUNT(dh.id) AS slShipped, SUM(dh.tongtien) AS tongCoDShipped FROM `donhang` as dh WHERE dh.trangthai= '-1' and dh.mashop = ? "; 

        const value_req =[
            req.body.userid
        
           
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

    countWaitProduct(req, res) {
        const sql = "SELECT COUNT(sp.id)  SPCho FROM `donhang` as dh JOIN sanpham AS sp ON dh.mavandon=sp.mavandon AND dh.trangthai ='1' and dh.mashop = ? "; 

        const value_req =[
            req.body.userid
        
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, waitProduct: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    countShippingProduct(req, res) {
        const sql = "SELECT COUNT(sp.id)  AS SPShip FROM `donhang` as dh JOIN sanpham AS sp ON dh.mavandon=sp.mavandon AND dh.trangthai ='0' and dh.mashop = ? "; 

        const value_req =[
            req.body.userid
       
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, shippingProduct: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }

    countShippedProduct(req, res) {
        const sql = "SELECT COUNT(sp.id) AS SPShipped FROM `donhang` as dh JOIN sanpham AS sp ON dh.mavandon=sp.mavandon AND dh.trangthai ='-1' and dh.mashop = ? "; 

        const value_req =[
            req.body.userid
        
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, shippedProduct: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }


    sumShip(req, res) {
        const sql = "SELECT SUM(phiship) as tongShip FROM donhang WHERE trangthai= '-1' and mashop = ? "; 

        const value_req =[
            req.body.userid
        
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, sumShip: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
}
module.exports = new StatiscalController