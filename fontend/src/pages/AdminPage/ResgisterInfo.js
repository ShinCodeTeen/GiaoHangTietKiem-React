import './style/registerInfo.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import axios from 'axios';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
function RegisterInfo({changeRoute}){
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
    const url = new URL(window.location.href); 
    const params = new URLSearchParams(url.search);
    const registerID = params.get('registerId');
    
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [sdt, setSdt] = useState('');
    const [cccd, setCccd] = useState('');
    const [email, setEmail] = useState('');
    const [diachi, setDiachi] = useState('');
    const [register,setRegister] = useState({});
    useEffect(() => {
        const fetchRegisterInfo =async()=>{
            try{
                const response = await axios.post('http://localhost:3001/adminManager/getregisterbyid', { registerId:registerID});
    
                if (response.data.success && response.data.Register) { 
                    setRegister(response.data.Register);
              
                } else {
                    setErrorMessage(response.data.message || "dữ liệu đơn đăng kí trống."); 
                }
            }
            catch(error){
                console.error("Lỗi khi lấy dữ liệu shipper:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu đơn đăng kí.');
            }
        }
        fetchRegisterInfo()
       
      

    }, []);

    useEffect(()=>{
        setCccd(register.cccd)
        setDiachi(register.diachi)
        setName(register.ten)
        setEmail(register.email)
        setSdt(register.sdt)
    },[register])
    let titleError
    if(register.trangthai=="Đã duyệt"){
        titleError = "Đơn đã được đồng ý trước đó"
    }
    else{
        titleError = "Đơn đã bị từ chối trước đó"
    }
    const handleAgree = async()=>{
       
        if(register.trangthai!="Chờ duyệt"){
            Toast.fire({
                icon: "error",
                title: titleError
            })
        }
        else{
            Swal.fire({
                
                title:'Xác nhận duyệt đơn?',
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
        
                try{
                    let userid = "Ship" + generateRandomString(5)
                    const response = await axios.post('http://localhost:3001/adminManager/updateregister', { trangthai: "Đã duyệt",registerId:registerID});
                    const resAdd = await axios.post('http://localhost:3001/adminManager/addshipper',{userid,ten:name,cccd,email,sdt,password:register.password,diachi})
                    if (response.data.success ==true && resAdd.data.success==true) { 
                        Toast.fire({
                            icon: "success",
                            title: "Duyệt đơn thành công"
                        })
                        const newregister = register
                        setRegister(newregister)
            
                    } else {
                        Toast.fire({
                            icon: "success",
                            title: "Duyệt đơn thất bại"
                        })
                }
            }
            catch(error){
                console.error("Đã xảy ra lỗi khi cập nhật dữ liệu đơn đăng kí", error);
                setErrorMessage('Đã xảy ra lỗi khi cập nhật dữ liệu đơn đăng kí');
                
            }
        })
    }
    }
    const handleRefuse = async()=>{
        if(register.trangthai!="Chờ duyệt"){
            Toast.fire({
                icon: "error",
                title: titleError
            })
        }
        else{

                Swal.fire({
                    
                    title:'Xác nhận từ chối?',
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
                try{
                    const response = await axios.post('http://localhost:3001/adminManager/updateregister', { trangthai: "Từ chối",registerId:registerID});
        
                    if (response.data.success ==true) { 
                    Toast.fire({
                        icon: "success",
                        title: "Đã từ chối đơn đăng kí"
                    })
                    const newregister = register
                    setRegister(newregister)
                
                    } else {
                        Toast.fire({
                            icon: "success",
                            title: "Từ chối thất bại"
                        })
                    }
                }
                catch(error){
                    console.error("Đã xảy ra lỗi khi cập nhật dữ liệu đơn đăng kí:", error);
                    setErrorMessage('Đã xảy ra lỗi khi cập nhật dữ liệu đơn đăng kí.');
                }
            })
        }
    }
    const handleBack = ()=>{
        changeRoute('/admin_page/register_managerment')
    }
    return(
        <div id='RegisterInfo'>
            <div className='group_info'>
                <p>Họ và Tên</p>
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
            <div className='bt'>
                <button className='tuchoi'onClick={handleBack}><i className="bi bi-caret-left-fill"></i>Quay lại</button>
                <button className='tuchoi'onClick={handleRefuse}><i className="bi bi-x-lg"></i>Từ chối</button>
                <button className='duyet' onClick={handleAgree} ><i className="bi bi-check-lg"></i>Duyệt Đơn</button>
            </div>
           
             
            
        </div>
    )
}

export default RegisterInfo
