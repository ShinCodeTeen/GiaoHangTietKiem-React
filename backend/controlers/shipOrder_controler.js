const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang' 
});
db.connect();
class ShipOrderController {
    orderInfo(req, res) {
        const sql = "SELECT * FROM Donhang WHERE mavandon = ?"; 
        const value_req =[
            req.body.maVanDon,
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, orderInfo: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    getProducts(req,res){
        const sql = "SELECT * FROM SanPham WHERE mavandon = ?"; 
        const value_req =[
            req.body.maVanDon,
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.json({ success: true, Products: results });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    getOrder(req, res) {
        const sql = "SELECT * FROM Donhang where trangthai = '1' ";  
        const value_req =[
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.json({ success: true, orders: results });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }

    getShipOrder(req, res) {
        const sql = "SELECT * FROM donhang where mashipper = ? ORDER BY trangthai ";  
        const value_req =[
            req.body.mashipper
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.json({ success: true, orders: results });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    receiveOrder(req, res) {
        const sql = "CALL ReceiveDonHang(?,?)"; 
        const value_req =[
            req.body.mavandon,
            req.body.mashipper,
            
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.status(200).json({ success: true}); 
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    completeOrder(req, res) {
        const sql = "CALL CompleteDonHang(?)"; 
        const value_req =[
            req.body.mavandon,
            
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.status(200).json({ success: true}); 
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    getKLOrder(req, res) {
        const sql = "SELECT SUM(sp.kl) as Kl FROM donhang AS dh JOIN sanpham AS sp ON dh.mavandon = sp.mavandon WHERE dh.mavandon = ?;";  
        const value_req =[
            req.body.mavandon
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.json({ success: true, orderKL: results });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
}
module.exports = new ShipOrderController