const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang'
})
db.connect()

class LoginController{
    shopLogin(req,res){
        const sql ="SELECT * FROM useraccount WHERE password = ? AND email = ? OR sdt = ? ";
        const value_req =[
            req.body.password,
            req.body.username,
            req.body.username
          
        ]
      db.query(sql, value_req, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.json({ success: false, message: "Database error" });
        }
    
        if (results.length > 0) {
          return res.json({ success: true,resultsAccount:results[0], message: "Login successful!" }); 
        } else {
          return res.json({ success: false, message: "Invalid username or password" }); 
        }
      });
    }
    shipLogin(req,res){
      const sql ="SELECT * FROM useraccount WHERE  password = ? AND email = ? OR sdt = ? ";
      const value_req =[req.body.password,req.body.username,req.body.username]
      db.query(sql, value_req, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
  
      if (results.length > 0) {
        return res.json({ success: true,resultsAccount:results[0], message: "Login successful!" }); 
      } else {
        return res.json({ success: false, message: "Invalid username or password" }); 
      }
      });
    }
    adminLogin(req,res){
      const sql ="SELECT * FROM adminaccount WHERE username= ? AND password = ?";
      const value_req =[req.body.username,req.body.password]
      db.query(sql, value_req, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
  
      if (results.length > 0) {
        return res.json({ success: true,resultsAccount:results[0], message: "Login successful!" }); 
      } else {
        return res.json({ success: false, message: "Invalid username or password" }); 
      }
      });
    }

    accountRegister(req, res){
      const sql ="CALL InsertAccount(?, ?, ?, ?, ?, ?,?, ?)";
      const value_req =[
        req.body.userid,
        req.body.ten,
        req.body.cccd,
        req.body.email,
        req.body.sdt,
        req.body.password,
        req.body.diachi,
        req.body.type
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
    accountRegister(req, res){
      const sql ="CALL InsertShipRegister(?, ?, ?, ?, ?, ?)";
      const value_req =[
        req.body.ten,
        req.body.cccd,
        req.body.email,
        req.body.sdt,
        req.body.password,
        req.body.diachi,
      ]
      db.query(sql, value_req, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
  
      if (results.length > 0) {
        return res.json({ success: true, message: "Insert successful!" }); 
      } else {
        return res.json({ success: false, message: "Insert Fail" }); 
      }
      });
    }



}

module.exports = new LoginController