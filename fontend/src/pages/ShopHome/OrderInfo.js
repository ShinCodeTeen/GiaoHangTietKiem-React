import'./style/OrderInfo.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import Swal from 'sweetalert2'
import { format } from 'date-fns'; 

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
function OrderInfo({changeRoute}){
    const [errorMessage,setErrorMessage] =useState(''); 
    const [order,setOrder]=useState({});
    const [products,setProducts]=useState([]);
    const [tenkh,setTenKh]= useState();
    const [sdt,setSdt]= useState();
    const [diachi,setDiaChi]= useState();
    const [mavandon,setMavandon]= useState();
    const url = new URL(window.location.href); 
    const params = new URLSearchParams(url.search);
    const maVanDon = params.get('maVanDon');
    const [trangThai,setTrangThai]=useState("")
    
    useEffect(() => {
       
        const fetchOrderInfo = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/shopOrder/orderInfo', { maVanDon });

                if (response.data.success && response.data.orderInfo) { 
                    const resOrder =response.data.orderInfo
                    setOrder(resOrder);
                } else {
                 
                    console.log("Lỗi khi lấy dữ liệu đơn hàng");
                }
            } catch (error) {
                console.error("Lỗi từ database:", error);
              
              
            }
        };
        const fetchOrderProduct = async () => {
            try {
                
                const response = await axios.post('http://localhost:3001/shopOrder/getProducts', { maVanDon });

                if (response.data.success && response.data.Products) { 
                    const resProducts =response.data.Products
                    setProducts(resProducts);
                   
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu sản phẩm."); 
                    console.log(errorMessage);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.');
                console.log(errorMessage);
            }
        };

        fetchOrderInfo(); 
        fetchOrderProduct();
      
        
    },[])
    useEffect(() => {
        if (order.trangthai === '1') {
            setTrangThai("Chờ lấy hàng");
        } else if (order.trangthai === '0') {
            setTrangThai("Đang giao");
        } else {
            setTrangThai("Đã giao");
        }
    }, [order.trangthai]); 
    useEffect(()=>{
        setDiaChi(order.diachi)
        setTenKh(order.tenkh)
        setSdt(order.sdt)
        setMavandon(order.mavandon)
    },[order])
    const handleChangeInfo=()=>{
        if(order.trangthai=='1'){
            Swal.fire({
                title: 'Xác nhận thay đổi thông tin ?',
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
                
                    const response = await axios.put('http://localhost:3001/shopOrder/updateOrder', {
                        mavandon:mavandon,
                        tenkh:tenkh,
                        sdt: sdt,
                        diachi:diachi
                    });
        
                    if (response.data.success) {
                        Toast.fire({
                            icon: "success",
                            title: "Cập nhật thông tin thành công!"  
                        });
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Cập nhật thông tin thất bại!" 
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
                icon:'error',
                title:'Đơn hàng đã được gửi đi, không thể sửa'
            })
        }
    }
    const handleDeleteOrder=(orderStatus,deleteOrderID)=>{
        if(orderStatus==='1'){
            Swal.fire({
                title: 'Xác nhận hủy đơn hàng ?',
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
                
                    const response = await axios.put('http://localhost:3001/shopOrder/deleteOrder', {
                        mavandon:deleteOrderID,
                       
                    });
        
                    if (response.data.success==true) {
                        Toast.fire({
                            icon: "success",
                            title: "Hủy đơn thành công!"  
                        });
                        changeRoute('/shop_page/don_hang')
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Hủy đơn thất bại!" 
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
                icon: "error",
                title: "Đơn hàng đã được gửi đi, không thể hủy"
            })
        }
        
    }
    return(
        <div id="OrderInfo">
            
            <div className='DH_GH'>
                <h2>Đơn Hàng</h2>
                <div className="group_info">
                    <p>Mã vận đơn</p>
                    <input type="text" value={order.mavandon}  readOnly/>              
                </div>
                <div className="group_info">
                    <p>Tên khách hàng</p>
                    <input type="text" value={tenkh} onChange={e=>{setTenKh(e.target.value)}}  readOnly={order.trangthai!=="1"}/>              
                </div>
                <div className="group_info">
                    <p>Địa chỉ</p>
                    <input type="text" value={diachi} onChange={e=>{setDiaChi(e.target.value)}} readOnly={order.trangthai!=="1"}/>              
                </div>
                <div className="group_info">
                    <p>Số điện thoại</p>
                    <input type="text" value={sdt} onChange={e=>{setSdt(e.target.value)}}  readOnly={order.trangthai!=="1"}/>              
                </div>
                <h2>Giao Hàng</h2>
                <div className="group_info">
                    <p>Loại đơn</p>
                    <input type="text" value={order.loaidon} readOnly/>              
                </div>
                <div className="group_info">
                    <p>Hình thức giao</p>
                    <input type="text" value={order.htgiao} readOnly/>              
                </div>
                <div className="group_info">
                    <p>Người giao hàng</p>
                    <input type="text" value={order.mashipper==""?"Chưa có":order.mashipper}  readOnly/>              
                </div>
                <div className="group_info">
                    <p>Tiền thu hộ (CoD)</p>
                    <input type="text" value={numeral(order.tongtien).format('0,0')+"đ"} readOnly/>              
                </div>
                <div className="group_info">
                    <p>Ngày gửi</p>
                    <input type="text" value={order.ngaygui} readOnly/>   
                        
                </div>
                <div className="group_info">
                    <p>Trạng thái</p>
                    <input type="text" value={trangThai} readOnly/>   
                        
                </div>
                <div className="buttons">
                    <a href="/shop_page/don_hang" ><i className="bi bi-caret-left"></i> Quay lại</a> 
                    <a onClick={()=>handleDeleteOrder(order.trangthai,order.mavandon)} ><i className="bi bi-x-lg"></i>  Hủy Đơn</a> 
                    <button onClick={handleChangeInfo} ><i className="bi bi-check-lg"></i>  Lưu thay đổi</button>         
                </div>
            </div>
            <div className='SP'>

                <h2>Sản Phẩm</h2>
                {products.map((product,index) => {
                    return (
                       
                        <div className="list_SP" key={product.id}>
                             <h3>SP {index+1}</h3>
                            <div className="group_info">
                                <p>Tên sản phẩm</p>
                                <input type="text" value={product.ten} readOnly />
                            </div>
                            <div className="group_info">
                                <p>Số lượng</p>
                                <input type="text" value={product.sl} readOnly />
                            </div>
                            <div className="group_info">
                                <p>Khối lượng</p>
                                <input type="text" value={product.kl} readOnly />
                            </div>
                            <div className="group_info">
                                <p>Giá tiền</p>
                                <input type="text" value={numeral(product.gia).format('0,0')+"đ"} readOnly />
                            </div>
                        </div>
                    ); 
})}
               
               
            </div>
           
        </div>
    )
}
export default OrderInfo