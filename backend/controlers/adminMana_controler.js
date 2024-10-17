const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang' 
});
db.connect();
class AdminManaController {
    getShops(req, res){
        const sql = "SELECT * FROM useraccount WHERE type= '0' "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, Shops: results });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    getShopById(req, res){
        const sql = "SELECT * FROM useraccount WHERE userid=? and type = '0' "; 

        const value_req =[ 
            req.body.userId
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, Shop: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Shop not found" });
                
            }
        });
    }
    getShips(req, res){
        const sql = "SELECT * FROM useraccount WHERE type= '1' "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, Ships: results });
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    getShipById(req, res){
        const sql = "SELECT * FROM useraccount WHERE userid=? and type = '1'"; 

        const value_req =[ 
            req.body.userId
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, Ship: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Register not found" });
                
            }
        });
    }

    getShipRegisters(req, res){
        const sql = "SELECT * FROM dondangki order by trangthai "; 

        const value_req =[ 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, Registers: results });
            } else {
                return res.status(404).json({ success: false, message: "Register not found" });
                
            }
        });
    }
    getShipRegisterById(req, res){
        const sql = "SELECT * FROM dondangki WHERE id=? "; 

        const value_req =[ 
            req.body.registerId
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true, Register: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Register not found" });
                
            }
        });
    }
    updateRegisterStatus(req, res) {
        const sql = "Call UpdateRegister(?,?) "; 

        const value_req =[
            req.body.registerId,
            req.body.trangthai, 
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true });
            } else {
                return res.status(404).json({ success: false, message: "Register not found" });
                
            }
        });
    }
    suspendUser(req, res){
        const sql = "CALL SuspendUser(?)"; 

        const value_req =[ 
            req.body.userId,
            
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true});
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    unSuspendUser(req, res){
        const sql = "CALL UnSuspendUser(?)"; 

        const value_req =[ 
            req.body.userId,
            
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {   
                return res.json({ success: true});
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });
    }
    addShipper(req, res){
        const type = '1'
        const sql ="CALL InsertAccount(?, ?, ?, ?, ?, ?,?, ?)";
        const value_req =[
          req.body.userid,
          req.body.ten,
          req.body.cccd,
          req.body.email,
          req.body.sdt,
          req.body.password,
          req.body.diachi,
          type
        ]
        db.query(sql, value_req, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.json({ success: false, message: "Database error" });
        }
    
        if (results.length > 0) {
          return res.json({ success: true, message: "Register successful!" }); 
        } else {
          return res.json({ success: false, message: "Invalid username or password" }); 
        }
        });
      }
}
module.exports = new AdminManaController
