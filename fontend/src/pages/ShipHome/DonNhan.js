import './style/component.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
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
function DonNhan() {
    const [dhSearch, setDHSearch] = useState('');
    const [selectedTrangThai, setSelectedTrangThai] = useState('');
    const [errorMessage,setErrorMessage] =useState(''); 
      
    const [orders, setOrders] = useState([])
    const [filtedOrders, setFiltedOrders] = useState([])
    


    useEffect(() => {
        const fetchListOrder = async () => {
            try {
                let maShipper = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/shipOrder/getShipOrder', { mashipper:maShipper });

                if (response.data.success && response.data.orders) { 
                    setOrders(response.data.orders);
                    setFiltedOrders(response.data.orders);
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu đơn hàng."); 
                }
            } catch (error) {
                console.warn("Đơn hàng trống");
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu đơn hàng.');
            }
        };

        fetchListOrder(); 
       
    },[])
    
    // const getKLOrder = async (mavandon) => {
    //     try {
    //         const response = await axios.post('http://localhost:3001/shipOrder/getKlOrder', { mavandon });

    //         if (response.data.success && response.data.orderKL) { 
    //             return response.data.orderKL.Kl;
    //         } else {
    //             setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu khối lượng."); 
    //             return null; 
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi lấy dữ liệu khối lượng.:", error);
    //         setErrorMessage('Đã xảy ra Lỗi khi lấy dữ liệu khối lượng..');
    //         return null; 
    //     }
    // };

     
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
    return (
        <div id="DonHang">
            <div className="filterDH">
                <div className='search_space'>
                    <div className='search'>
                        <i className="bi bi-search"></i>
                        <input
                            type='text'
                            placeholder='Nhập tên, SĐT, mã đơn hàng'
                            value={dhSearch}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <select  value={selectedTrangThai} onChange={handleStatusChange}>
                    <option value="" >Chọn trạng thái </option>
               
                    <option value="0">Đang giao</option>
                    <option value="-1">Đã giao</option>
                </select>
            </div>
            <div className='Conntent_DH'>
                <table>
                    <thead>
                        <tr>
                            <th>Đơn Hàng</th>
                            <th>Khách Hàng</th>
                            <th>Ngày gửi</th>
                            <th>Trạng thái</th>
                            <th>Cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtedOrders.map(order => (
                            <tr key={order.mavandon}>
                                <td>{order.mavandon}</td>
                                <td>{order.tenkh}</td>
                                <td>{format(order.ngaygui, 'dd/MM/yyyy')}</td>
                            
                                <td>{order.trangthai==0?"Đang giao":"Đã giao"}</td>
                                <td>
                                    <Link to={`/ship_page/updateOrder?maVanDon=${order.mavandon}`}>
                                        <i className="bi bi-arrow-repeat"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DonNhan;