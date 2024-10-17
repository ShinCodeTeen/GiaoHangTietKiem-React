import { useState, useEffect } from 'react';
import './style/component.css'
import Swal from 'sweetalert2'
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
function ChangePassWord({onToogle}){
    const [oldPass,setOldPass] = useState()
    const [newPass,setNewPass] = useState()
    const [confirmPass,setConfirmPass] = useState()
    const [user,setUser] = useState()
    const [errorMessage,setErrorMessage] =useState(''); 

    const onCloseComponent = onToogle
    const handleExit=()=>{
        onCloseComponent();
    }
    useEffect(() => { 
        const fetchUserInfo = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/userInfo/user', { userID });

                if (response.data.success && response.data.shopInfo) { 
                    setUser(response.data.shopInfo);
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
    const handleChangePass = async () => {
        
        
        if (!oldPass || !newPass || !confirmPass) {
            return Toast.fire({
                icon: "error",
                title: "Vui lòng nhập đủ thông tin!"
            });
        }
    
        if (oldPass !== user.password) {
            return Toast.fire({
                icon: "error",
                title: "Mật khẩu hiện tại không đúng!"
            });
        }
    
        if (newPass !== confirmPass) {
            return Toast.fire({
                icon: "error",
                title: "Mật khẩu mới không trùng khớp!"
            });
        }
    
        handleExit()
    
        Swal.fire({
            title: 'Xác nhận đổi mật khẩu?',
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
                const userID = sessionStorage.getItem('userID');
                const response = await axios.put('http://localhost:3001/userInfo/updatePassword', {
                    userID,
                    password: newPass
                });
    
                if (response.data.success) {
                    Toast.fire({
                        icon: "success",
                        title: "Cập nhật mật khẩu thành công!"  
                    });
                } else {
                    console.error("Lỗi khi cập nhật:", response.data.message);
                    Toast.fire({
                        icon: "error",
                        title: response.data.message || "Cập nhật mật khẩu thất bại!" 
                    });
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật mật khẩu:", error);
                Toast.fire({
                    icon: "error",
                    title: "Cập nhật mật khẩu thất bại!"
                });
            }
        });
    };
    return(
        <div id='ChangePassShip'>
            <div className='title_component'>
                <h2>Đổi Mật Khẩu</h2>
                <p onClick={onToogle}>x</p>
            </div>
            <div className='content'>
                <div className='input_pass'>
                    <input type='text' placeholder='Nhập mật khẩu hiện tại' value={oldPass} onChange={e=>{setOldPass(e.target.value)}}/><br/>
                </div>
                <div className='input_pass'>
                    <input type='password' placeholder='Nhập mật khẩu mới' value={newPass} onChange={e=>{setNewPass(e.target.value)}}/><br/>
                </div>
                <div className='input_pass'>
                    <input type='password' placeholder='Xác nhận mật khẩu mới' value={confirmPass} onChange={e=>{setConfirmPass(e.target.value)}}/>
                </div>
            </div>
            <div className='bt_confirm'>
                <button onClick={onToogle} className='bt_huy'>Hủy</button>
                <button onClick={handleChangePass}className='bt_xacnhan'>Xác nhận</button>

            </div>
        </div>
    )

}
export default ChangePassWord