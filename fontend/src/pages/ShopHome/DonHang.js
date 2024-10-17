import './style/componentCss.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {getListOrder} from './controlers/order'
import { format } from 'date-fns'; 
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
function DonHang({changeRoute}) {
    const [dhSearch, setDHSearch] = useState('');
   
    const [refreshKey,setRefreshKey]=useState(0);
   
    const [selectedTrangThai, setSelectedTrangThai] = useState('');
    const [errorMessage,setErrorMessage] =useState(''); 
      
    const [orders, setOrders] = useState([])
    const [filtedOrders, setFiltedOrders] = useState([])
    


    useEffect(() => {
        const fetchListOrder = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/shopOrder/getOrder', { userID });

                if (response.data.success && response.data.orders) { 
                    setOrders(response.data.orders);
                    setFiltedOrders(response.data.orders);
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu đơn hàng."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu đơn hàng.');
            }
        };
    
        fetchListOrder()
       
    },[refreshKey])
  
    const handleSearchChange=(e)=>{
        setDHSearch(e.target.value)
        if(e.target.value ===""){
            setFiltedOrders(orders)
        }
        else{
            const filtered = orders.filter(order => {
                const searchTerm = dhSearch.toLowerCase();
                return (
                    order.mavandon.toLowerCase().includes(searchTerm) || 
                    order.tenkh.toLowerCase().includes(searchTerm) ||
                    order.sdt.toLowerCase().includes(searchTerm) 
                );
            });
            setFiltedOrders(filtered);
    }
       
    }
    const handleStatusChange = (e) => {
        setSelectedTrangThai(e.target.value);
        const selectedStatus = e.target.value;

        if (selectedStatus === "") {
            setFiltedOrders(orders); 
        } else {
            
            const filteredOrders = orders.filter(order => order.trangthai === selectedStatus);
            setFiltedOrders(filteredOrders);
        }
    };
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
                     setRefreshKey(prev=>prev+1) 
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
    return (
        <div id="DonHang">
            <div className="filterDH">
                <div className='search_space'>
                    <div className='search'>
                        <i className="bi bi-search"></i>
                        <input
                            type='text'
                            placeholder='Nhập tên khách hàng, SĐT, mã đơn hàng'
                            value={dhSearch}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <select  value={selectedTrangThai} onChange={handleStatusChange}>
                    <option value="" >Chọn trạng thái </option>
                    <option value="1">Chờ giao hàng</option>
                    <option value="0">Đang giao</option>
                    <option value="-1">Đã giao</option>
                </select>
            </div>
            <div className='Conntent_DH'>
                <table>
                    <thead>
                        <tr>
                            <th>Đơn Hàng</th>
                            <th>Ngày Gửi</th>
                            <th>Khách Hàng</th>
                            <th>Số điện thoại</th>
                            <th>Chi Tiết</th>
                            <th>Hủy Đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtedOrders.map(order => (
                            <tr key={order.mavandon}>
                                <td>{order.mavandon}</td>
                                <td>{format(order.ngaygui, 'dd/MM/yyyy')}</td>
                                <td>{order.tenkh}</td>
                                <td>{order.sdt}</td>
                                <td>
                                    <Link to={`/shop_page/order_info?maVanDon=${order.mavandon}`}>
                                        <i className="bi bi-info-circle-fill"></i>
                                    </Link>
                                </td>
                                <td>{order.trangthai==1?<i onClick={()=>handleDeleteOrder(order.trangthai,order.mavandon)} className="bi bi-x-circle-fill"></i>:"Đã gửi đi"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DonHang;