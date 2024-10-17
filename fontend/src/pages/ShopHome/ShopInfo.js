import './style/componentCss.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import axios from 'axios';
import { getShopInfo,updateInfo} from './controlers/userInfo'
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

function ShopInfo() {
  
   
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [sdt, setSdt] = useState('');
    const [cccd, setCccd] = useState('');
    const [email, setEmail] = useState('');
    const [diachi, setDiachi] = useState('');
    useEffect(() => {
        const fetchShopInfo = async () => {
          try {
            const userRes = await getShopInfo(); 
            if (userRes) {
              setUser(userRes.shopinfo); 
            }
          } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
          }
        };
    
        fetchShopInfo();
      }, []);
   
    useEffect(() => {
        if (user) {
            setName(user.ten || "");
            setSdt(user.sdt || "");
            setCccd(user.cccd || "");
            setEmail(user.email || "");
            setDiachi(user.diachi || "");
        }
    }, [user]);


    const handleChangeInfo = async () => {
        Swal.fire({
            title: 'Xác nhận lưu thay đổi?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resUpdate = updateInfo(name, sdt, cccd, email, diachi)
                    if (resUpdate) {
                      Toast.fire({
                        icon: "success",
                        title: "Cập nhật thông tin thành công"
                      });
                    } else {
                      Toast.fire({
                        icon: "error",
                        title: "Cập nhật thất bại"
                      });
                    }
                } catch (error) {
                    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
                    Toast.fire({
                      icon: "error",
                      title: "Cập nhật thất bại"
                    });
                }
            }
        });
    };

    return (
        <div id='ShopInfo'>
            <div className='group_info'>
                <p>Tên shop</p>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='group_info'>
                <p>SĐT</p>
                <input type='text' value={sdt} onChange={(e) => setSdt(e.target.value)} />
            </div>
            <div className='group_info'>
                <p>CCCD</p>
                <input type='text' value={cccd} onChange={(e) => setCccd(e.target.value)} />
            </div>
            <div className='group_info'>
                <p>Email</p>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='group_info'>
                <p>Địa chỉ</p>
                <input type='text' value={diachi} onChange={(e) => setDiachi(e.target.value)} />
            </div>
            <div className='bt_luu'>
                <button onClick={handleChangeInfo}>Lưu Thay Đổi</button>
            </div>
        </div>
    );
}

export default ShopInfo;