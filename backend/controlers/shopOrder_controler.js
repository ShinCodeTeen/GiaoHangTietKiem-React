const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webgiaohang' 
});
db.connect();

class OrderController {
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
   

        const sql = "SELECT * FROM donhang where mashop = ?";  
        const value_req =[
            req.body.userID,
           
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
    addOrder(req, res) {

        const sql = "CALL InsertDonHang(?,?,?,?,?,?,?,?,?)"
        const value_req = [
          req.body.order_maVanDon,
          req.body.maShop,
          req.body.tenKh,
          req.body.sdt,
          req.body.diaChi,
          req.body.loaiDon,
          req.body.htGiao,
          req.body.phiShip,
          req.body.tongTien
        ];
      
        db.query(sql, value_req, (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
          }
      
          if (results.length > 0) {
            return res.status(200).json({ success: true, idOrder: results[0].inserted_id }); 
          } else {
            return res.status(404).json({ success: false, message: "Order not found" }); 
          }
        });


    }
    addProduct(req, res) {

     

        const sql = "CALL InsertSanPham(?, ?, ?, ?, ?)"; 
        const value_req =[
            req.body.maVanDon,
            req.body.name,
            req.body.klsp,
            req.body.slsp,
            req.body.giasp,
           
           
        ]
        db.query(sql, value_req, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                return res.status(200).json({ success: true, idProduct: results[0].inserted_id }); 
            } else {
                return res.status(404).json({ success: false, message: "Order not found" });
                
            }
        });


    }
    updateOrder(req, res) {


        const sql = "CALL UpdateDonHang(?, ?, ?, ?)"; 
        const value_req =[
            req.body.mavandon,
            req.body.tenkh,
            req.body.sdt,
            req.body.diachi,
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
    deleteOrder(req, res) {
        const sql = "CALL DeleteDonHang(?)";
        const value_req = [req.body.mavandon];
      
        db.query(sql, value_req, (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
          }
          console.log(results)
          const result = results[0][0]; 
      
          if (result.status === 1) {
            return res.status(200).json({ success: true, message: result.message, rowsAffected: result.rowsAffected });
          } else {
            return res.status(404).json({ success: false, message: result.message });
          }
        });
      }
    
}
module.exports = new OrderController