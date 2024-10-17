import Content from "./Content.js";

import Foot from "./Footer.js";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../Login.css'
import logo from '../../../assets/img/logo.png';
import axios from 'axios';
import Swal from'sweetalert2'
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

function Login({onLogin}){
    function loginSuccess() {
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
    document.title='Đăng Nhập'
    const handleLoginSuccess = () => {
        onLogin(true); 
        console.log("Login successful!"); 
      };
    const navigate = useNavigate()
    const [username,setUserName] =useState();
    const [password,setPassWord] =useState();
    const [errorMessage,setErrorMessage] =useState(); 

    const handleLogin =async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
 
    try {
      const response = await axios.post('http://localhost:3001/login/shop', { username, password });
      console.log(response.data);

      if (response.data.success==true && response.data.resultsAccount ) {
        let ac = response.data.resultsAccount
        if(ac.trangthai =='0')
        {
          Swal.fire({
            title: "Tài khoản của bạn đã bị đình chỉ. Vui lòng liên hệ CSKH để được mở khóa!",
        
            icon: "error",
        });
        }
        else{

          handleLoginSuccess()
          loginSuccess()
          sessionStorage.setItem('userID',ac.userid)
          navigate('/shop_page'); 
        }
        
      } else {
        setErrorMessage(response.data); 
        loginFail()
      }
    } catch (error) {
      console.error("Login error:", error); 
      setErrorMessage('An error occurred during login.');
    }
  };
 
    return(
        <div className="Login">
            <div id='header_lg'>
            <img src={logo}/>
            <input
                className='username_input'
                value={username}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder='Email hoặc số điện thoại'
            />
            <input
                type='password'
                value={password}
                onChange={(e)=>setPassWord(e.target.value)}
                placeholder='Mật khẩu'
            />
            <a>Bạn quên mật khẩu?</a>
            <button onClick={handleLogin}>Đăng Nhập</button>
            </div>
    
       
            <Content/>
            <Foot/>
        </div>
       

    )
}
export default Login