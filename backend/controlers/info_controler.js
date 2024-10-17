const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang' 
});
db.connect();
class UserInfoController {
    
    userInfo(req, res) {
        const sql = "SELECT * FROM useraccount WHERE userid = ?"; 
        const value_req =[
            req.body.userID,
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.json({ success: true, shopInfo: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Shop not found" });
                console.log('Khong tim thay')
            }
        });
    }
 
    adminInfo(req, res) {
       
        const sql = "SELECT * FROM adminaccount WHERE id = ?";
        const value_req =[
            req.body.userID,
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.json({ success: true, adminInfo: results[0] });
            } else {
                return res.status(404).json({ success: false, message: "Shipper not found" });
            }
        });
    }
    updateInfo(req, res) {
        const sql = "UPDATE `useraccount` SET `ten`= ?, `cccd`= ?, `email`= ?, `sdt`= ?, `diachi`= ? WHERE userid = ?";
        const value_req = [
            req.body.ten,
            req.body.cccd,
            req.body.email,
            req.body.sdt,
            req.body.diachi,
            req.body.userID,
        ];
    
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Lỗi cơ sở dữ liệu" });
            }
    
            if (results.affectedRows > 0) {
                return res.json({ success: true, message: "Cập nhật thông tin thành công" });
            } else {
                return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
            }
        });
    }
    updatePassword(req, res) {
        const sql = "UPDATE `useraccount` SET `password`= ? WHERE userid = ?";
        const value_req = [
            req.body.password,
            req.body.userID,
        ];
    
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Lỗi cơ sở dữ liệu" });
            }
    
            if (results.affectedRows > 0) {
                return res.json({ success: true, message: "Cập nhật mật khẩu thành công" });
            } else {
                return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
            }
        });
    }
}

module.exports = new UserInfoController