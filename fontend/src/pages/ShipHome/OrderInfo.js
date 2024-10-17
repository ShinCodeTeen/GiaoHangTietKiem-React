import'./style/shipOderInfo.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import Swal from 'sweetalert2'
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
function OrderInfo(){
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
    const [refreshKey,setRefreshKey]=useState(0);
    
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
      
        
    },[refreshKey])
    useEffect(() => {
        if (order.trangthai === '-1') {
            setTrangThai("Đã giao");
        } else if (order.trangthai === '0') {
            setTrangThai("Đang giao");
        } else {
            setTrangThai("Chờ lấy hàng");
        }
    }, [order.trangthai]); 
    useEffect(()=>{
        setDiaChi(order.diachi)
        setTenKh(order.tenkh)
        setSdt(order.sdt)
        setMavandon(order.mavandon)
    },[order])
    const handleChangeInfo=()=>{
        if(order.trangthai==='1'){
            Swal.fire({
                title: 'Bạn sẽ giao đơn này ?',
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
                const mashipper = sessionStorage.getItem('userID');
                const maDon = order.mavandon
                try {
                    const response = await axios.put('http://localhost:3001/shipOrder/receiveOrder', {
                        mavandon:maDon,
                        mashipper:mashipper,

                    });
        
                    if (response.data.success) {
                        Toast.fire({
                            icon: "success",
                            title: "Nhận đơn thành công!"  
                        });
                        setRefreshKey(prev=>prev+1)
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Lỗi nhận đơn!" 
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
                title:'Đơn hàng đã có người giao'
            })
        }
    }
    return(
        <div id="ShipOrder">
            
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
                    <p>Tiền thu hộ (CoD)</p>
                    <input type="text" value={numeral(order.tongtien).format('0,0')+"đ"} readOnly/>              
                </div>
                <div className="group_info">
                    <p>Trạng thái</p>
                    <input type="text" value={trangThai} readOnly/>   
                        
                </div>
                <div className="buttons">
                    <a href="/ship_page" ><i className="bi bi-caret-left"></i> Quay lại</a> 
                    <button onClick={handleChangeInfo} ><i className="bi bi-check-lg"></i> {trangThai==1?'Nhận đơn':'Đang được giao'}</button>     
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