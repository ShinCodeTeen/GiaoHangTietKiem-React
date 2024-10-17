import {useEffect, useState} from 'react'
import '../Login.css'
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
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
function Content (){
    const [shopName,setShopName] =useState('')
    const [numberPhone,setNumberPhone] =useState('')
    const [location,setLocation] =useState('')
    const [passWord,setPassWord] =useState('')
    const [commitPass,setCommitPass] =useState('')
    const [cccd,setCccd] = useState('')
    const [email,setEmail]=useState('')
    
    const handleRegister=()=>{
        if(shopName==''||numberPhone==''||location==''||passWord==''||commitPass==''){
            Swal.fire({
                title: "Error",
                text: "Vui lòng nhập đầy đủ thông tin",
                icon: "error",
            });
        }
        else if(passWord!==commitPass){
            Swal.fire({
                title: "Error",
                text: "Lỗi xác nhận mật khẩu",
                icon: "error",
            });
        }
        else{
            Swal.fire({
                title: 'Xác nhận đăng kí ?',
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
                    const userId ="Shop"+generateRandomString(5) 
                    const response = await axios.put('http://localhost:3001/login/register', {
                        userid:userId,
                        ten:shopName,
                        cccd:cccd,
                        email:email,
                        sdt:numberPhone,
                        password:passWord,
                        diachi:location,
                        type:0
                    });
        
                    if (response.data.success) {
                        Toast.fire({
                            icon: "success",
                            title: "Đăng kí thành công, bạn có thể đăng nhập!"  
                        });
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Có lỗi trong quá trình đăng kí, vui lòng thử lại!" 
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi cập nhật mật khẩu:", error);
                    Toast.fire({
                        icon: "error",
                        title: "Có lỗi trong quá trình đăng kí, vui lòng thử lại!"
                    });
                }
            });
            
        }
    }
    return(
        <div id='content_lg'>
            <div className='intro_content'>
                <h1>GHTK có gì hay?</h1>
                <ul>
                    <li>
                        <h4>Phủ sóng 99% huyện xã</h4>
                        <p>Lấy hàng/Giao hàng trên 11.000 huyện xã trên toàn quốc</p>
                    </li>
                    <li>
                        <h4>App cho iOS và Android</h4>
                        <p>Đăng đơn-Tracking-Xử lý đơn hàng mọi lúc mọi nơi trên điện thoại</p>
                    </li>
                    <li>
                        <h4>Giao nhanh không kịp hủy</h4>
                        <p>Giao nội tỉnh 6-12h<br/>Giao nội miền 24-36h<br/>Giao liên miền 48h </p>
                    </li>
                    <li>
                        <h4>Đối soát trả tiền nhanh</h4>
                        <p>Chuyển khoản vào tài khoản NH 3 lần/tuần vào thứ 2/4/6</p>
                    </li>
                    <li>
                        <h4>Miễn phí giao nhiều lần</h4>
                        
                    </li>
                    <li>
                        <h4>Miễn phí thu hộ tiền</h4>
                        
                    </li>
                </ul>
            </div>
            <div className='register'>
                <h1>Đăng ký dịch vụ</h1>
                <input
                    placeholder='Tên cửa hàng/shop'
                    value={shopName}
                    onChange={(e)=>setShopName(e.target.value)}
                />
                 <input
                    placeholder='Căn cước công dân chủ sở hữu'
                    value={cccd}
                    onChange={(e)=>setCccd(e.target.value)}
                />
                <input
                    placeholder='Điện thoại liên hệ'
                    value={numberPhone}
                    onChange={(e)=>setNumberPhone(e.target.value)}
                />
                 <input
                    placeholder='Địa chỉ email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    placeholder='Địa chỉ cửa hàng/shop'
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Mật khẩu'
                    value={passWord}
                    onChange={(e)=>setPassWord(e.target.value)}
                />
                 <input
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    value={commitPass}
                    onChange={(e)=>setCommitPass(e.target.value)}
                />
                <button onClick={handleRegister}>Đăng Ký</button>
            </div>
        </div>
    )
}

export default Content