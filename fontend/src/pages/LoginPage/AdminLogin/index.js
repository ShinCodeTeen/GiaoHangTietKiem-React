import './index.css'
import { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

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

function AdminLogin({onLogin}) {
    const [username, setUserName] = useState();
    const [password, setPassWord] = useState();
    const [errorMessage, setErrorMessage] = useState(); 
    const navigate = useNavigate()

    const handleLoginSuccess = () => {
        onLogin(true)
        console.log("Login Successful!");
        
    };

    function loginSuccess() {
     
        handleLoginSuccess(); 

        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công"
        });
    }

    function loginFail() {
        Toast.fire({
            title: "Tài khoản hoặc mật khẩu không đúng!",
        
            icon: "error",
        });
    }

    const handleAdLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login/admin', { username, password });
            console.log(response.data);
      
            if (response.data.success) {
        
              loginSuccess()
              let ac = response.data.resultsAccount
              sessionStorage.setItem('userID', ac.id)
              navigate('/admin_page'); 
              
            } else {
              setErrorMessage(response.data); 
              loginFail()
            }
          } catch (error) {
            console.error("Login error:", error); 
            setErrorMessage('An error occurred during login.');
          }
    }

    return (
        <div id="AdminLogin" >
            <div className='Content'>
                <h2>Xin chào quản lý</h2>
                <h3>Đăng nhập để tiếp tục vào hệ thống</h3>
                <div className='input_ac'>
                    <div className='ad_group'>
                        <input type='text' value={username} onChange={e => setUserName(e.target.value)} placeholder='Nhập username...' />
                    </div>
                    <div className='ad_group'>
                        <input type='password' value={password} onChange={e => setPassWord(e.target.value)} placeholder='Nhập password...' />
                    </div>
                    <div className='bt_group'>
                        <button onClick={handleAdLogin}>Đăng nhập</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AdminLogin;