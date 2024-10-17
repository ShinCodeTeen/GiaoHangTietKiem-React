import './style/component.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; 

function NhanDon({changeRoute}) {
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
    const [dhSearch, setDHSearch] = useState('');
    const [selectedTrangThai, setSelectedTrangThai] = useState('');
    const [errorMessage,setErrorMessage] =useState(''); 
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [orders, setOrders] = useState([])
    const [filtedOrders, setFiltedOrders] = useState([])
    const [shopName,setShopName] = useState()
    const [shopID, setShopID] = useState()
    const mashipper = sessionStorage.getItem('userID')
    const [refreshKey,setRefreshKey]=useState(0);

  
    const handleNhanDon =async(orderID)=>{
        
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
    
            try {
                const response = await axios.put('http://localhost:3001/shipOrder/receiveOrder', {
                    mavandon:orderID,
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
    useEffect(() => {
        const fetchListOrder = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/shipOrder/getOrder', {  });

                if (response.data.success && response.data.orders) { 
                    setOrders(response.data.orders);
                    setFiltedOrders(response.data.orders);
                } else {
                    setErrorMessage("Đơn hàng trống"); 
                }
            } catch (error) {
              
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu đơn hàng.');
            }
        };

        fetchListOrder(); 
       
    },[refreshKey])
    const handleSearchChange=(e)=>{
        
        setDHSearch(e.target.value);
        clearTimeout(searchTimeout); 

        setSearchTimeout(setTimeout(() => { 
            if (e.target.value === "") {
                setFiltedOrders(orders);
            } else {
                const filtered = orders.filter(order => {
                    const searchTerm = e.target.value.toLowerCase(); 
                    return (
                        order.mavandon.toLowerCase().includes(searchTerm) ||
                        order.tenkh.toLowerCase().includes(searchTerm) ||
                        order.sdt.toLowerCase().includes(searchTerm)
                    );
                });
                setFiltedOrders(filtered);
            }
        }, 500));
       
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
                            placeholder='Nhập ma shop, SĐT, mã đơn hàng'
                            value={dhSearch}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
              
            </div>
            <div className='Conntent_DH'>
                <table>
                    <thead>
                        <tr>
                            <th>Đơn Hàng</th>
                            <th>Mã Shop</th>
                            <th>Khách Hàng</th>
                            <th>Ngày gửi</th>
                            <th>Chi Tiết</th>
                            <th>Nhận Đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtedOrders.map(order => (
                            <tr key={order.mavandon}>
                                <td>{order.mavandon}</td>
                                <td>{order.mashop}</td>
                                <td>{order.tenkh}</td>
                                <td>{format(order.ngaygui, 'dd/MM/yyyy')}</td>

                                <td>
                                    <Link to={`/ship_page/order_info?maVanDon=${order.mavandon}`}>
                                        <i className="bi bi-info-circle-fill"></i>
                                    </Link>
                                </td>
                                <td>
                                        <i onClick={() => handleNhanDon(order.mavandon)} className="bi bi-box-arrow-in-down"></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NhanDon;