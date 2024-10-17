import './style/component.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import axios from 'axios';

const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

function ShopInfo({changeRoute}) {
  
    const url = new URL(window.location.href); 
    const params = new URLSearchParams(url.search);
    const userId = params.get('ShipId');
    const [errorMessage, setErrorMessage] = useState('');
    const [ship, setShip] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);
    const fetchShopInfo = async () => {
        console.log(userId)
        try {
          
            const response = await axios.post('http://localhost:3001/adminManager/getshipbyid', { userId });

            if (response.data.success && response.data.Ship) { 
                const resShip =response.data.Ship
                setShip(resShip);
            } else {
             
                console.log("Lỗi khi lấy dữ liệu shipper");
            }
        } catch (error) {
            console.error("Lỗi từ database:", error);
        }
    };
    useEffect(() => {
        fetchShopInfo();
        console.log(refreshKey)
      }, [refreshKey]);
   



      const handleSuspend = async(userId,userStatus)=>{
        let statusUpdate
        if(userStatus == 1){
            Swal.fire({
            
                title:'Xác nhận thay đổi trạng thái đình chỉ ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No', 
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                 
                },
            }).then(async (result) => {
                if (!result.isConfirmed) {
                    return; 
                }
        
                try {
                
                    const response = await axios.put('http://localhost:3001/adminManager/suspenduser', {
                        userId,
                        status:statusUpdate
                       
                    });
        
                    if (response.data.success==true) {
                        Toast.fire({
                            icon: "success",
                            title: "Thay đổi trạng thái đình chỉ thành công!"  
                        });
                        setRefreshKey(prevKey=> prevKey+1)
                       
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Thay đổi trạng thái đình chỉ thất bại!" 
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi cập nhật thông tin:", error);
                    Toast.fire({
                        icon: "error",
                        title: "Lỗi cơ sở dữ liệu !"
                    });
                }
            });
        }
        else{
            Swal.fire({
            
                title:'Xác nhận thay đổi trạng thái đình chỉ ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No', 
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                 
                },
            }).then(async (result) => {
                if (!result.isConfirmed) {
                    return; 
                }
        
                try {
                
                    const response = await axios.put('http://localhost:3001/adminManager/unsuspenduser', {
                        userId,
                        status:statusUpdate
                       
                    });
        
                    if (response.data.success==true) {
                        Toast.fire({
                            icon: "success",
                            title: "Thay đổi trạng thái đình chỉ thành công!"  
                        });
                        setRefreshKey(prevkey=>prevkey+1)
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Thay đổi trạng thái đình chỉ thất bại!" 
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi cập nhật thông tin:", error);
                    Toast.fire({
                        icon: "error",
                        title: "Lỗi cơ sở dữ liệu !"
                    });
                }
            });
        }
      
    }
    const handleBack=() => {
        changeRoute('admin_page/shipper_managerment')
    }

    return (
        <div id='ShopInfo'>
            <div className='group_info'>
                <p>Tên shop</p>
                <input type='text' value={ship.ten}  readOnly/>
            </div>
            <div className='group_info'>
                <p>SĐT</p>
                <input type='text' value={ship.sdt} readOnly/>
            </div>
            <div className='group_info'>
                <p>CCCD</p>
                <input type='text' value={ship.cccd}  readOnly/>
            </div>
            <div className='group_info'>
                <p>Email</p>
                <input type='text' value={ship.email}  readOnly/>
            </div>

            <div className='group_info'>
                <p>Địa chỉ</p>
                <input type='text' value={ship.diachi} readOnly/>
            </div>
            <div className='bt '>
            <button style={{background:'red'}} onClick={handleBack}><i className="bi bi-caret-left-fill"></i>Quay lại</button>
                    <button onClick={()=>handleSuspend(ship.userid,ship.trangthai)}><i className={ship.trangthai==0?"bi bi-unlock-fill":"bi bi-lock-fill"}></i>{ship.trangthai==0?'Bỏ đình chỉ':'Đình chỉ'}</button>
            </div>
        </div>
    );
}

export default ShopInfo;