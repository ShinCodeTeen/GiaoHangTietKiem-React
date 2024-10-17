import './style/TaoDon.css'
import { useState,useEffect } from 'react';
import Swal from'sweetalert2'
import numeral from 'numeral';

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

function TaoDon({ onClose }){
    const [refreshKey,setRefreshKey]=useState(0);
    
    const [errorMessage,setErrorMessage] =useState(''); 

    const [tenKh,setTenKh]=useState('')
    const [sdt,setSdt]=useState('')
    const [diaChi,setDiaChi]=useState('')
    const [loaiDon,setLoaiDon] = useState('EXPRESS nhanh 20kg')
    const [htGiao,setHtGiao] = useState('Bộ')
    const [htTraShip,setHtTraShip] = useState("1")

    const [tensp,setTenSP] = useState('')
    const [sl,setSl] = useState(0)
    const [kl,setKl] = useState(0)
    const [gia,setGia] = useState(0)
    const [tongKL, setTongKL] = useState(0);
    const [giatrihang, setGiaTriHang] = useState(0);
    const [phiShip,setPhiShip] = useState(0)
    const [tongTien,setTongTien]=useState(0)
    const [tienthuho,setTienThuHo]=useState(0)
    const [isValidPhone, setIsValidPhone] = useState(false);
    const[products,setProducts] = useState([])
    const resetInput=()=>{
        setTenKh("")
        setSdt("")
        setDiaChi("")
        setTenSP("")
        setProducts([])
        setTienThuHo("")
    }
    const handlehtTraShip= (e)=>{
        setHtTraShip(e.target.value)
    }

    const handleHtGiao= (e)=>{
        setHtGiao(e.target.value)
    }

    const handleLoaidon= (e)=>{
        setLoaiDon(e.target.value)
    }

    const handlePhoneChange = (e) => {
        const phoneInput = e.target;
        setIsValidPhone(phoneInput.validity.valid); 
        setSdt(phoneInput.value)
      };

    
    const handleAddProduct = () => {
        if(tensp===""||kl==0||sl==0){
            Swal.fire({
                title: "Error",
                text: "Vui lòng nhập đầy đủ thông tin",
                icon: "error",
            });
        }
        else{
        const prd = { name: tensp, kl: kl, sl: sl, gia: gia }; 
        setProducts(prev => [...prev, prd]);
        setTenSP(''); 
        setGia(0);
        setKl(0);
        setSl(0)
        }
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };
    const InsertOrder = async (order_maVanDon) => {
        let maShop = sessionStorage.getItem('userID')

        try {
            const response = await axios.put('http://localhost:3001/shopOrder/addOrder', { order_maVanDon,maShop,tenKh,sdt,diaChi,loaiDon,phiShip,htGiao,tongTien });
            if (response.data.success==true) { 
                Toast.fire({
                    icon: 'success',
                    title: 'Thêm đơn hàng thành công'
                })
                resetInput();
            } else {
                setErrorMessage(response.data.message || "Lỗi thêm đơn hàng."); 
                Toast.fire({
                    icon: 'error',
                    title: 'Xảy ra lỗi kết quả'
                })
            }
        } catch (error) {
            console.error("Lỗi thêm đơn hàng:", error);
            setErrorMessage('Lỗi thêm đơn hàng.');
            Toast.fire({
                icon: 'error',
                title: 'Xảy ra lỗi cơ sở dữ liệu'
            })
        }
    };
    const InsertProduct = async (maVanDon,name,klsp,slsp,giasp) => {
       
        
                    try {
                        const response = await axios.post('http://localhost:3001/shopOrder/addProduct', { maVanDon,name,klsp,slsp,giasp });
                        if (response.data.success==true) { 
                           
                        } else {
                            setErrorMessage(response.data.message || "Lỗi thêm sản phẩm"); 
                           
                        }
                    } catch (error) {
                        console.error("Lỗi thêm sản phẩm:", error);
                        setErrorMessage('Lỗi thêm sản phẩm.');
                       
                    }
    };
    const handleCreate = () => {
        if(tenKh==""||sdt==""||diaChi==""||products.length==0){
            Swal.fire({
                title: "Error",
                text: "Vui lòng nhập đầy đủ thông tin",
                icon: "error",
            });
        }
        else{

            if(!isValidPhone){
                Swal.fire({
                    title: "Error",
                    text: "Thông tin người nhận không đúng",
                    icon: "error",
                });
            }
            else{

                Swal.fire({
                    title: 'Xác nhận tạo đơn hàng?',
                   
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
                        let maVanDon = generateRandomString(10);

                        InsertOrder(maVanDon);
                        products.map((product) => {
                            InsertProduct(maVanDon,product.name,product.kl,product.sl,product.gia)
                        })
                        resetInput()
                        setRefreshKey(prev=>prev+1)
                    } 
                  })
                
            }
          
        }
        
      };
    
      const handleCancel = () => {
        onClose(); 
      };
    
      useEffect(() => {
        
        let newTongKL = 0;
        let newgiatrihang = 0;
        for (const product of products) {
            newTongKL += product.kl * product.sl;
            newgiatrihang += product.gia * product.sl;
        }
        setTongKL(newTongKL);
        setGiaTriHang(newgiatrihang);
    }, [products]);


    useEffect(() => {
        let newPhiShip=0
        if(tongKL==0){
            newPhiShip=0
        }
        else if(tongKL>0 && tongKL<0.5){
            newPhiShip = 20000
        }
        else{
            let kldu =tongKL-0.5
            newPhiShip = 20000+(kldu/0.5)*2500
        }
        setPhiShip(newPhiShip)
    }, [tongKL]);
   
    
    useEffect(()=>{
       let tt = 0
        if(htTraShip==0){
            tt=parseInt(tienthuho)
        }
        else{
            if(tienthuho)
                tt = parseInt(tienthuho) + parseInt(phiShip)
            else
                tt = parseInt(phiShip)
        }
        setTongTien(tt)
    },[tienthuho])

    useEffect(()=>{
       let tt = 0
        if(htTraShip==0){
            tt=parseInt(tienthuho)
        }
        else{
            if(tienthuho)
                tt = parseInt(tienthuho) + parseInt(phiShip)
            else
                tt = parseInt(phiShip)
        }
        setTongTien(tt)
    },[phiShip])
    useEffect(()=>{
       let tt = 0
        if(htTraShip==0){
            tt=parseInt(tienthuho)
        }
        else{
            if(tienthuho)
                tt = parseInt(tienthuho) + parseInt(phiShip)
            else
                tt = parseInt(phiShip)
        }
        setTongTien(tt)
       
    },[htTraShip])

    return (
        <div id="TaoDon">
            <div className='Customer'>
            
                <div className="section_info">
                    <h2>Người Nhận</h2>
                    <div className="form-group">
                        <i className="bi bi-telephone"></i>
                        <input 
                            type="tel" 
                            placeholder='Nhập số điện thoại khách hàng' 
                            name="phone" 
                            pattern="[0-9]{10}" 
                            value={sdt}
                            onChange={handlePhoneChange}
                            required/>  
                    </div>
                    <div className="form-group">
                        <i className="bi bi-person"></i>
                        <input type="text" placeholder='Tên khách hàng' value={tenKh} onChange={e=>setTenKh(e.target.value)} name="name" required/>
                    </div>
                    <div className="form-group">
                        <i className="bi bi-house-door"></i>
                        <input type="text" placeholder='Địa chỉ khách hàng' value={diaChi} onChange={e=>setDiaChi(e.target.value)} name="address" required/>
                    </div>
                </div>
                <div className="section_ship">
                    <h2>Lấy & Giao tận nơi</h2>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="shipping" 
                            value="EXPRESS nhanh 20kg"
                            checked={loaiDon ==="EXPRESS nhanh 20kg"}
                            onChange={handleLoaidon} 
                            />
                        <svg data-v-dd2bf721="" width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="tl-pr-2 tl-w-fit"><path d="M34.1996 7.25827L22.0508 0.587088C21.9466 0.529952 21.8297 0.5 21.7109 0.5C21.592 0.5 21.4751 0.529952 21.3709 0.587088L16.8024 3.0959C16.6981 3.12519 16.6019 3.17818 16.5214 3.25076L9.22219 7.25827C9.11112 7.31913 9.01848 7.40876 8.95397 7.51775C8.88946 7.62674 8.85546 7.75108 8.85555 7.87773V9.32185H0.706183C0.518892 9.32185 0.339271 9.39625 0.206836 9.52868C0.0744014 9.66112 0 9.84074 0 10.028C0 10.2153 0.0744014 10.3949 0.206836 10.5274C0.339271 10.6598 0.518892 10.7342 0.706183 10.7342H8.85555V13.2771H4.80584C4.71169 13.2749 4.61804 13.2915 4.53041 13.326C4.44278 13.3605 4.36293 13.4122 4.29556 13.478C4.22819 13.5438 4.17466 13.6225 4.13811 13.7093C4.10156 13.7961 4.08273 13.8893 4.08273 13.9835C4.08273 14.0776 4.10156 14.1709 4.13811 14.2577C4.17466 14.3445 4.22819 14.4231 4.29556 14.4889C4.36293 14.5547 4.44278 14.6064 4.53041 14.6409C4.61804 14.6754 4.71169 14.692 4.80584 14.6898H8.85555V18.3629H2.9223C2.73501 18.3629 2.55539 18.4373 2.42295 18.5697C2.29052 18.7021 2.21611 18.8817 2.21611 19.069C2.21611 19.2563 2.29052 19.4359 2.42295 19.5684C2.55539 19.7008 2.73501 19.7752 2.9223 19.7752H8.85555V21.2201C8.85546 21.3468 8.88946 21.4711 8.95397 21.5801C9.01848 21.6891 9.11112 21.7787 9.22219 21.8396L21.3709 28.5096C21.4751 28.5667 21.592 28.5967 21.7109 28.5967C21.8297 28.5967 21.9466 28.5667 22.0508 28.5096L34.1996 21.8396C34.3105 21.7786 34.4031 21.689 34.4675 21.58C34.5319 21.471 34.5659 21.3467 34.5658 21.2201V18.057C34.5615 17.8725 34.4852 17.697 34.3532 17.5681C34.2212 17.4391 34.044 17.367 33.8594 17.367C33.6749 17.367 33.4977 17.4391 33.3657 17.5681C33.2337 17.697 33.1574 17.8725 33.153 18.057V20.802L22.4171 26.6969V14.9659L25.8314 13.0897V16.065C25.8314 16.1877 25.8633 16.3082 25.924 16.4147C25.9847 16.5212 26.0721 16.6101 26.1776 16.6726C26.2831 16.7351 26.403 16.7691 26.5256 16.7712C26.6482 16.7733 26.7692 16.7434 26.8768 16.6845L29.48 15.252C29.5909 15.191 29.6834 15.1013 29.7478 14.9924C29.8121 14.8834 29.846 14.7591 29.8459 14.6325V10.8848L33.1515 9.06942V12.404C33.1493 12.4982 33.1659 12.5918 33.2005 12.6795C33.235 12.7671 33.2866 12.8469 33.3524 12.9143C33.4183 12.9817 33.4969 13.0352 33.5837 13.0718C33.6705 13.1083 33.7637 13.1272 33.8579 13.1272C33.9521 13.1272 34.0453 13.1083 34.1321 13.0718C34.2189 13.0352 34.2975 12.9817 34.3633 12.9143C34.4291 12.8469 34.4808 12.7671 34.5153 12.6795C34.5498 12.5918 34.5665 12.4982 34.5643 12.404V7.87425C34.5639 7.74839 34.5299 7.62492 34.4657 7.51662C34.4016 7.40833 34.3097 7.31913 34.1996 7.25827ZM21.0043 26.6969L10.2683 20.8012V9.07019L21.0043 14.9655V26.6969ZM21.7109 13.7425L11.0295 7.87735L14.3865 6.03407L25.068 11.8992L21.7109 13.7425ZM26.5357 11.0931L15.8539 5.228L17.0119 4.59228L27.6933 10.457L26.5357 11.0931ZM28.4328 14.2163L27.2442 14.8707V12.3154L28.4347 11.6615L28.4328 14.2163ZM29.1587 9.65171L18.4796 3.78621L21.7109 2.01223L32.3919 7.87735L29.1587 9.65171Z" fill="#00904A"></path></svg>
                        <label>EXPRESS nhanh 20kg</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="shipping" 
                            value="BBS lớn ≥ 20kg"
                            checked={loaiDon ==="BBS lớn ≥ 20kg"}
                            onChange={handleLoaidon}/>
                        <svg data-v-dd2bf721="" width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="tl-pr-2 tl-w-fit"><path d="M0.706343 5.09907C0.468902 4.37545 0.533385 3.58935 0.885745 2.91203C1.2381 2.23471 1.84979 1.72105 2.58754 1.48296C3.32529 1.24487 4.12933 1.30163 4.82449 1.64089C5.51965 1.98015 6.0496 2.57441 6.2989 3.29421L12.0847 20.449C11.5349 20.3074 10.9598 20.2862 10.4006 20.3869L4.79808 3.77838C4.68469 3.44226 4.43946 3.16397 4.11633 3.00474C3.7932 2.84551 3.41865 2.81837 3.07507 2.9293C2.7315 3.04023 2.44703 3.28014 2.28427 3.59626C2.1215 3.91237 2.09377 4.27879 2.20716 4.6149C2.27279 4.8096 2.25667 5.02183 2.16235 5.20491C2.06803 5.38798 1.90323 5.5269 1.70421 5.5911C1.50519 5.65531 1.28825 5.63954 1.10111 5.54727C0.913975 5.45499 0.771973 5.29377 0.706343 5.09907ZM23.5022 18.5577L14.0227 21.6166C14.3688 22.0009 14.6316 22.4499 14.7951 22.9365C14.8012 22.9545 14.8047 22.974 14.8104 22.9905L23.9967 20.0248C24.0985 19.9957 24.1933 19.9469 24.2754 19.8812C24.3575 19.8156 24.4253 19.7344 24.4746 19.6426C24.524 19.5508 24.5539 19.4502 24.5627 19.3468C24.5715 19.2434 24.5589 19.1393 24.5257 19.0408C24.4925 18.9423 24.4393 18.8513 24.3694 18.7733C24.2995 18.6953 24.2142 18.6319 24.1187 18.5868C24.0232 18.5417 23.9194 18.5159 23.8135 18.5109C23.7076 18.5059 23.6017 18.5218 23.5022 18.5577ZM14.0449 23.1788C14.2372 23.7491 14.2524 24.3624 14.0884 24.9412C13.9245 25.5199 13.5888 26.0381 13.1238 26.4302C12.6588 26.8223 12.0854 27.0707 11.4761 27.144C10.8668 27.2173 10.249 27.1121 9.70073 26.8419C9.1525 26.5717 8.69849 26.1485 8.39612 25.6258C8.09376 25.1031 7.95661 24.5045 8.00202 23.9056C8.04744 23.3067 8.27337 22.7344 8.65126 22.2611C9.02915 21.7878 9.54201 21.4348 10.125 21.2466C10.9067 20.9944 11.7589 21.0562 12.494 21.4185C13.2291 21.7809 13.787 22.4141 14.0449 23.1788ZM12.5712 23.6544C12.4751 23.3692 12.2946 23.1183 12.0527 22.9334C11.8107 22.7485 11.5182 22.638 11.2121 22.6158C10.9059 22.5936 10.5999 22.6607 10.3327 22.8086C10.0656 22.9565 9.84925 23.1786 9.71113 23.4468C9.57301 23.7151 9.51929 24.0173 9.55676 24.3154C9.59423 24.6135 9.72122 24.894 9.92166 25.1214C10.1221 25.3489 10.387 25.5131 10.6828 25.5933C10.9787 25.6735 11.2922 25.6661 11.5837 25.5719C11.9745 25.4457 12.2981 25.1727 12.4832 24.8131C12.6684 24.4536 12.7001 24.0368 12.5712 23.6544ZM21.1069 6.92041L24.3251 16.463C24.3573 16.5602 24.349 16.6659 24.3019 16.757C24.2548 16.8482 24.1727 16.9175 24.0736 16.9498L13.9427 20.2206C13.8433 20.2523 13.7352 20.2443 13.6419 20.1982C13.5487 20.152 13.4779 20.0717 13.4451 19.9746L10.2268 10.432C10.1943 10.3349 10.2025 10.229 10.2496 10.1378C10.2968 10.0465 10.379 9.97726 10.4783 9.94525L20.6077 6.67552C20.7071 6.64329 20.8155 6.65098 20.9091 6.6969C21.0027 6.74282 21.0738 6.82322 21.1069 6.92041ZM19.7672 12.4623L16.3158 10.6069L14.6741 14.1069L15.7612 14.5963L16.4712 13.0824L17.7531 16.8835L18.9779 16.4873L17.6999 12.687L19.1927 13.4898L19.7672 12.4623ZM16.7575 6.77063L14.6994 0.669665C14.6783 0.60744 14.6329 0.555934 14.573 0.52645C14.5132 0.496966 14.4438 0.491911 14.3802 0.512394L12.616 1.08194L12.6072 1.09729L12.5927 1.08943L11.6618 1.38899L12.4273 3.66192L11.3782 4.00155L10.6126 1.72899L9.68137 2.02856L9.67448 2.04353L9.65764 2.03642L7.90497 2.60222C7.84139 2.62276 7.78875 2.66714 7.7586 2.72563C7.72846 2.78412 7.72328 2.85192 7.74421 2.91414L9.80118 9.01585C9.82217 9.07805 9.86754 9.12955 9.92733 9.15904C9.98711 9.18853 10.0564 9.1936 10.12 9.17313L16.5964 7.08255C16.66 7.06201 16.7126 7.01763 16.7427 6.95914C16.7729 6.90065 16.7784 6.83285 16.7575 6.77063Z" fill="#00904A"></path></svg>
                        <label>BBS lớn ≥ 20kg</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="shipping" 
                            value="BBS ECO Tiết kiệm"
                            checked={loaiDon ==="BBS ECO Tiết kiệm"}
                            onChange={handleLoaidon}/>
                        <svg data-v-dd2bf721="" width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="tl-pr-2 tl-w-fit"><path d="M0.706343 5.09907C0.468902 4.37545 0.533385 3.58935 0.885745 2.91203C1.2381 2.23471 1.84979 1.72105 2.58754 1.48296C3.32529 1.24487 4.12933 1.30163 4.82449 1.64089C5.51965 1.98015 6.0496 2.57441 6.2989 3.29421L12.0847 20.449C11.5349 20.3074 10.9598 20.2862 10.4006 20.3869L4.79808 3.77838C4.68469 3.44226 4.43946 3.16397 4.11633 3.00474C3.7932 2.84551 3.41865 2.81837 3.07507 2.9293C2.7315 3.04023 2.44703 3.28014 2.28427 3.59626C2.1215 3.91237 2.09377 4.27879 2.20716 4.6149C2.27279 4.8096 2.25667 5.02183 2.16235 5.20491C2.06803 5.38798 1.90323 5.5269 1.70421 5.5911C1.50519 5.65531 1.28825 5.63954 1.10111 5.54727C0.913975 5.45499 0.771973 5.29377 0.706343 5.09907ZM23.5022 18.5577L14.0227 21.6166C14.3688 22.0009 14.6316 22.4499 14.7951 22.9365C14.8012 22.9545 14.8047 22.974 14.8104 22.9905L23.9967 20.0248C24.0985 19.9957 24.1933 19.9469 24.2754 19.8812C24.3575 19.8156 24.4253 19.7344 24.4746 19.6426C24.524 19.5508 24.5539 19.4502 24.5627 19.3468C24.5715 19.2434 24.5589 19.1393 24.5257 19.0408C24.4925 18.9423 24.4393 18.8513 24.3694 18.7733C24.2995 18.6953 24.2142 18.6319 24.1187 18.5868C24.0232 18.5417 23.9194 18.5159 23.8135 18.5109C23.7076 18.5059 23.6017 18.5218 23.5022 18.5577ZM14.0449 23.1788C14.2372 23.7491 14.2524 24.3624 14.0884 24.9412C13.9245 25.5199 13.5888 26.0381 13.1238 26.4302C12.6588 26.8223 12.0854 27.0707 11.4761 27.144C10.8668 27.2173 10.249 27.1121 9.70073 26.8419C9.1525 26.5717 8.69849 26.1485 8.39612 25.6258C8.09376 25.1031 7.95661 24.5045 8.00202 23.9056C8.04744 23.3067 8.27337 22.7344 8.65126 22.2611C9.02915 21.7878 9.54201 21.4348 10.125 21.2466C10.9067 20.9944 11.7589 21.0562 12.494 21.4185C13.2291 21.7809 13.787 22.4141 14.0449 23.1788ZM12.5712 23.6544C12.4751 23.3692 12.2946 23.1183 12.0527 22.9334C11.8107 22.7485 11.5182 22.638 11.2121 22.6158C10.9059 22.5936 10.5999 22.6607 10.3327 22.8086C10.0656 22.9565 9.84925 23.1786 9.71113 23.4468C9.57301 23.7151 9.51929 24.0173 9.55676 24.3154C9.59423 24.6135 9.72122 24.894 9.92166 25.1214C10.1221 25.3489 10.387 25.5131 10.6828 25.5933C10.9787 25.6735 11.2922 25.6661 11.5837 25.5719C11.9745 25.4457 12.2981 25.1727 12.4832 24.8131C12.6684 24.4536 12.7001 24.0368 12.5712 23.6544ZM21.1069 6.92041L24.3251 16.463C24.3573 16.5602 24.349 16.6659 24.3019 16.757C24.2548 16.8482 24.1727 16.9175 24.0736 16.9498L13.9427 20.2206C13.8433 20.2523 13.7352 20.2443 13.6419 20.1982C13.5487 20.152 13.4779 20.0717 13.4451 19.9746L10.2268 10.432C10.1943 10.3349 10.2025 10.229 10.2496 10.1378C10.2968 10.0465 10.379 9.97726 10.4783 9.94525L20.6077 6.67552C20.7071 6.64329 20.8155 6.65098 20.9091 6.6969C21.0027 6.74282 21.0738 6.82322 21.1069 6.92041ZM19.7672 12.4623L16.3158 10.6069L14.6741 14.1069L15.7612 14.5963L16.4712 13.0824L17.7531 16.8835L18.9779 16.4873L17.6999 12.687L19.1927 13.4898L19.7672 12.4623ZM16.7575 6.77063L14.6994 0.669665C14.6783 0.60744 14.6329 0.555934 14.573 0.52645C14.5132 0.496966 14.4438 0.491911 14.3802 0.512394L12.616 1.08194L12.6072 1.09729L12.5927 1.08943L11.6618 1.38899L12.4273 3.66192L11.3782 4.00155L10.6126 1.72899L9.68137 2.02856L9.67448 2.04353L9.65764 2.03642L7.90497 2.60222C7.84139 2.62276 7.78875 2.66714 7.7586 2.72563C7.72846 2.78412 7.72328 2.85192 7.74421 2.91414L9.80118 9.01585C9.82217 9.07805 9.86754 9.12955 9.92733 9.15904C9.98711 9.18853 10.0564 9.1936 10.12 9.17313L16.5964 7.08255C16.66 7.06201 16.7126 7.01763 16.7427 6.95914C16.7729 6.90065 16.7784 6.83285 16.7575 6.77063Z" fill="#00904A"></path></svg>
                        <label>BBS ECO Tiết kiệm</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="shipping_ht" 
                            value="Bộ"
                            checked={htGiao ==="Bộ"}
                            onChange={handleHtGiao}/>
                        <svg data-v-8384b246="" width="29" height="18" viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.6965 4.73276H20.7971V0.369141H2.59966C1.16332 0.369141 0 1.34549 0 2.55098V14.551H2.59966C2.59966 16.3565 4.34789 17.8237 6.49912 17.8237C8.65034 17.8237 10.3986 16.3565 10.3986 14.551H18.1975C18.1975 16.3565 19.9457 17.8237 22.0969 17.8237C24.2482 17.8237 25.9964 16.3565 25.9964 14.551H28.5961V9.09644L24.6965 4.73276ZM6.49912 16.1873C5.42025 16.1873 4.54939 15.4564 4.54939 14.551C4.54939 13.6455 5.42025 12.9146 6.49912 12.9146C7.57799 12.9146 8.44884 13.6455 8.44884 14.551C8.44884 15.4564 7.57792 16.1873 6.49912 16.1873ZM22.0969 16.1873C21.0181 16.1873 20.1472 15.4564 20.1472 14.551C20.1472 13.6455 21.0181 12.9146 22.0969 12.9146C23.1758 12.9146 24.0467 13.6455 24.0467 14.551C24.0467 15.4564 23.1758 16.1873 22.0969 16.1873ZM20.7971 9.09644V6.36918H24.0466L26.6008 9.09644H20.7971Z" fill="currentColor"></path></svg>
                        <label>Bộ</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="shipping_ht" 

                            
                            value="Bay"
                            checked={htGiao ==="Bay"}
                            onChange={handleHtGiao}/>
                        <svg data-v-8384b246="" width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.5109 7.67509L16.4734 7.81514L16.5459 7.94069L23.1012 19.2934C23.1012 19.2934 23.1012 19.2934 23.1012 19.2934C23.3869 19.7882 23.4625 20.3651 23.3135 20.9211L23.3135 20.9211L23.0101 22.0531C22.996 22.1059 22.9545 22.1461 22.9018 22.1587L22.9 22.1591C22.8468 22.1721 22.7916 22.1553 22.7552 22.1151L22.7545 22.1143L15.2147 13.8446L14.8134 13.4044L14.6242 13.9692C14.1452 15.3993 13.6992 16.5796 13.1531 18.0228L12.5906 19.5076L12.5156 19.7055L12.6561 19.8639L15.4397 23.001L15.4409 23.0023C15.4735 23.0387 15.4861 23.0898 15.4728 23.1391L15.2141 24.1049C15.2027 24.1474 15.1717 24.185 15.1286 24.2048C15.0965 24.2185 15.0624 24.2206 15.0302 24.2119C15.0206 24.2094 15.0107 24.2056 15.0003 24.2002L15.0002 24.2001L11.0111 22.1199L10.942 22.0839L10.8642 22.0805L6.36941 21.8875L6.36873 21.8875C6.32553 21.8857 6.28375 21.8642 6.25617 21.8264L6.25601 21.8261C6.22895 21.7891 6.22024 21.7414 6.23182 21.6982L6.49061 20.7323C6.50344 20.6844 6.53917 20.6452 6.58988 20.6279C6.58997 20.6279 6.59006 20.6278 6.59016 20.6278L10.5688 19.3003L10.7695 19.2333L10.8035 19.0245L11.0575 17.4624C11.0575 17.4624 11.0575 17.4623 11.0575 17.4623C11.3066 15.9375 11.5108 14.6913 11.811 13.2134L11.9296 12.6295L11.3619 12.8102L0.696915 16.204L0.694916 16.2047C0.644317 16.2211 0.58777 16.2084 0.548102 16.1704L0.546871 16.1692C0.507956 16.1322 0.491885 16.0763 0.506103 16.0232L0.809418 14.8912C0.958255 14.3358 1.31295 13.8739 1.81064 13.5865L1.63564 13.2834L1.81064 13.5865L13.1606 7.03354L13.2862 6.96106L13.3237 6.82102L14.3876 2.85045C14.542 2.27437 14.8245 1.72902 15.2049 1.27219L15.5394 0.908984L15.5451 0.902705L15.5506 0.896153C15.824 0.568516 16.2721 0.42279 16.7144 0.541298C17.1533 0.658909 17.4714 1.00671 17.5495 1.45577L17.5511 1.4646L17.5531 1.47334L17.6514 1.90562C17.7574 2.51595 17.7287 3.13027 17.5749 3.70452L16.5109 7.67509Z" stroke="#BDBDBD" strokeWidth="0.7"></path></svg>
                        <label>Bay</label>
                    </div>
                </div>
                <div className="section_getOrder">
                    <h2>Trả Ship</h2>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="pickup" 
                            checked={htTraShip==="1"} 
                            value="1"
                            onChange={handlehtTraShip}/>
                        <label>Khách hàng trả ship</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="pickup" 
                            checked={htTraShip==="0"} 
                            value="0"
                            onChange={handlehtTraShip}/>
                        <label>Shop trả ship</label>
                    </div>
                </div>
                <div className='button_huy'>
                    <button onClick={handleCancel}>Hủy</button>
                </div>
                
            </div>
            <div className="Product">
                <div className="add_prd" >
                    <h2>Sản phẩm</h2>
                    <i className="bi bi-plus" onClick={handleAddProduct}>
                        Thêm sản phẩm</i> 
                </div>
                <div className="custom_info">
                    
                    <div className="name_product">
                        <input type='text' placeholder="Nhập tên sản phẩm" value={tensp} onChange={e=>{setTenSP(e.target.value)}}/>
                    </div>
                    
                    <div className='info_product'>
                        <p>Khối lượng (kg)</p> 
                        <input type='number' placeholder='Khối lượng' value={kl} onChange={e=>{setKl(e.target.value>=0?e.target.value:0)}}/>
                    </div>
                    <div className='info_product'>
                        <p>Số lượng</p> 
                        <input type='number' placeholder='Số lượng' value={sl} onChange={e=>{setSl(e.target.value>=0?e.target.value:0)}}/>
                    </div>
                    <div className='info_product'>
                        <p>Giá (đ)</p> 
                        <input type='text' placeholder='giá' value={gia} onChange={e=>{setGia(e.target.value>=0?e.target.value:0)}}/>
                          
                    </div>
                </div>
                {products.map((product, index) => (
                <div className="custom_info" key={index}> 
                    <div className="name_product">
                        <input
                            type='text'
                            placeholder="Nhập tên sản phẩm"
                            value={product.name}
                            onChange={e => {
                                const updatedProducts = [...products];
                                updatedProducts[index].name = e.target.value;
                                setProducts(updatedProducts);
                            }}
                        />
                        
                        <i onClick={() => handleDeleteProduct(index)}className="bi bi-trash"></i> 
                        
                    </div>
                    <div className='info_product'>
                        <p>Khối lượng (kg)</p>
                        <input type='number' placeholder='Khối lượng' value={product.kl}
                               onChange={e => {
                                   const updatedProducts = [...products];
                                   updatedProducts[index].kl = e.target.value>=0 ? e.target.value :0
                                   setProducts(updatedProducts);
                               }} />
                    </div>
                 
                    <div className='info_product'>
                        <p>Số Lượng</p>
                        <input type='number' placeholder='Số lượng' value={product.sl}
                               onChange={e => {
                                   const updatedProducts = [...products];
                                   updatedProducts[index].sl = parseInt(e.target.value>=0?e.target.value:0, 10) || 0;
                                   setProducts(updatedProducts);
                               }} />
                    </div>
                    <div className='info_product'>
                        <p>Giá</p>
                        <input type='text' placeholder='Giá' value={product.gia}
                               onChange={e => {
                                   const updatedProducts = [...products];
                                   updatedProducts[index].gia = parseInt(e.target.value, 10) || 0;
                                   setProducts(updatedProducts);
                               }} />
                    </div>
                   
                </div>
                ))}
               <div className='total_info'>
                    <div className='group_disenable'>
                        <p>Tổng KL </p>
                        <input type='text' placeholder='Tổng khối lượng' value={tongKL===0?"":tongKL}readOnly/>
                    </div>
                    <div className='group_disenable'>
                        <p>Tổng giá trị đơn </p>
                        <input type='text' placeholder='Tổng giá trị đơn' value={giatrihang===0?"":numeral(giatrihang).format('0,0')} readOnly/>
                    </div>
                    <div className='group_enable'>
                        <p>Tiền thu hộ </p>
                        <input 
                            type='text' 
                            placeholder='Nhập tiền thu hộ' 
                            value={tienthuho} 
                            onChange={e=>setTienThuHo(e.target.value)}/>
                    </div>
                    <div className='group_disenable'>
                        <p>Phí ship </p>
                        <input 
                            type='text' 
                            placeholder='Phí ship' 
                            
                            value={phiShip===0?"":numeral(phiShip).format('0,0')}
                             readOnly/>
                           
                    </div>
                    <div className='group_disenable'>
                        <p>Tổng tiền </p>
                        <input type='text' placeholder='Tổng tiền'value={tongTien===0?"":numeral(tongTien).format('0,0')} readOnly/>
                    </div>
               </div>
                <div className='button_tao'>
                    <button onClick={handleCreate}>Tạo</button>

                </div>
                
            </div> 
        </div>
       
    )
}
export default TaoDon