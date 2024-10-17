import "./style/ShipHome.css"
import userlogo from "../../assets/img/avt.jpg"
import Swal from 'sweetalert2'
import { useState,useEffect } from "react";
import axios from 'axios';


function Sidebar({changeRoute,onStatusChangePass}){
    const [errorMessage,setErrorMessage] =useState(''); 

    const [user,setUser] =useState(''); 
   
    const handleChangePass = ()=>{
      
           onStatusChangePass()
      
    }
    useEffect(() => { 
        const fetchUserInfo = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/userInfo/admin', { userID });

                if (response.data.success && response.data.adminInfo) { 
                    setUser(response.data.adminInfo);
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy thông tin người dùng."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng.');
            }
        };

        fetchUserInfo(); 
    }, []); 


    const handleLogout=()=>{
        Swal.fire({
            title: 'Đăng xuất khỏi tài khoản?',
           
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            },
          }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear(); 
                changeRoute('/'); 
            } 
          })
       
    }
    return(
        <div id="sidebar" className="open close">
            <div className="user_info">
                <img src={userlogo} alt=""/>
                <div className="info">
                    <h1>{user.ten}</h1>
                    <p>{user.chucvu}</p>
                </div>
                
            </div>
            <div className="navbar">
                    <a href="/admin_page">
                    <i className="bi bi-bar-chart"></i>
                        Thống kê    
                    </a>
                    <a href="/admin_page/shop_managerment">
                    <i className="bi bi-shop-window"></i>
                        Shop bán hàng
                    </a>
                    <a href="/admin_page/shipper_managerment">
                    <i className="bi bi-truck"></i>
                        Shipper
                    </a>
                    <a href="/admin_page/register_managerment">
                    <i className=" bi-clipboard2-check"></i>
                       Đơn đăng kí
                    </a>
                    <a onClick={handleLogout} className="logout ">
                    <i className="bi bi-box-arrow-right"></i>
                        Đăng xuất
                    </a>
                </div>
              
        </div>
    )
}


export default Sidebar