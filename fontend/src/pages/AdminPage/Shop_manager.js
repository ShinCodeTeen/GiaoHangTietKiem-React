import './style/component.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
function ShopManager() {
    const [dhSearch, setDHSearch] = useState('');
   
    const [refreshKey, setRefreshKey] = useState(0);
   
    const [selectedTrangThai, setSelectedTrangThai] = useState('');
    const [errorMessage,setErrorMessage] =useState(''); 
      
    const [shops, setShops] = useState([])
    const [filtedShops, setFiltedShops] = useState([])
    


    useEffect(() => {
        const fetchListShop = async () => {
            try {
         
                const response = await axios.post('http://localhost:3001/adminManager/getshops', {});

                if (response.data.success && response.data.Shops) { 
                    setShops(response.data.Shops);
                    setFiltedShops(response.data.Shops);
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu shop."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu shop.');
            }
        };

        fetchListShop(); 
       
    },[refreshKey])
    const handleSearchChange=(e)=>{
        setDHSearch(e.target.value)
        if(e.target.value ===""){
            setFiltedShops(shops)
        }
        else{
            const filtered = shops.filter(shop => {
                const searchTerm = dhSearch.toLowerCase();
                return (
                    shop.mavandon.toLowerCase().includes(searchTerm) || 
                    shop.tenkh.toLowerCase().includes(searchTerm) ||
                    shop.sdt.toLowerCase().includes(searchTerm) 
                );
            });
            setFiltedShops(filtered);
    }
       
    }
    const handleStatusChange = (e) => {
        setSelectedTrangThai(e.target.value);
        const selectedStatus = e.target.value;

        if (selectedStatus === "") {
            setFiltedShops(shops); 
        } else {
            
            const filteredshops = shops.filter(shop => shop.trangthai === selectedStatus);
            setFiltedShops(filteredshops);
        }
    };
    const handleSuspend = async(userId,userStatus)=>{
        let statusUpdate
        if(userStatus == 1){
            Swal.fire({
            
                title:'Xác nhận thay đổi trạng thái đình chỉ ?',
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
                
                    const response = await axios.put('http://localhost:3001/adminManager/suspenduser', {
                        userId,
                        status:statusUpdate
                       
                    });
        
                    if (response.data.success==true) {
                        Toast.fire({
                            icon: "success",
                            title: "Thay đổi trạng thái đình chỉ thành công!"  
                        });
                        setRefreshKey(prevkey=>prevkey+1)
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Thay đổi trạng thái đình chỉ thất bại!" 
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
            
                title:'Xác nhận thay đổi trạng thái đình chỉ ?',
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
                
                    const response = await axios.put('http://localhost:3001/adminManager/unsuspenduser', {
                        userId,
                        status:statusUpdate
                       
                    });
        
                    if (response.data.success==true) {
                        Toast.fire({
                            icon: "success",
                            title: "Thay đổi trạng thái đình chỉ thành công!"  
                        });
                        setRefreshKey(prevkey=>prevkey+1)
                    } else {
                        console.error("Lỗi khi cập nhật:", response.data.message);
                        Toast.fire({
                            icon: "error",
                            title: response.data.message || "Thay đổi trạng thái đình chỉ thất bại!" 
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
      
    }
    return (
        <div id="Manager">
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
                    <option value="1">Chờ giao hàng</option>
                    <option value="0">Đang giao</option>
                    <option value="-1">Đã giao</option>
                </select>
            </div>
            <div className='Conntent_DH'>
                <table>
                    <thead>
                        <tr>
                            <th>Mã shop</th>    
                            <th>Chủ sở hữu</th>
                            <th>Trạng thái</th>
                            <th>Chi Tiết</th>
                            <th>Đình chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtedShops.map(shop => (
                            <tr key={shop.id}>
                                <td>{shop.userid}</td>
                                <td>{shop.ten}</td>
                                <td>{shop.trangthai==1?"Đang hoạt động":"Đình chỉ"}</td>
                                <td>
                                    <Link to={`/admin_page/shopMana_info?shopId=${shop.userid}`}>
                                        <i className="bi bi-info-circle-fill"></i>
                                    </Link>
                                </td>
                                <td><i onClick={()=>handleSuspend(shop.userid,shop.trangthai)} style={{ color: shop.trangthai == 0 ? 'red' : 'green' }} className={shop.trangthai==0?"bi bi-lock-fill":"bi bi-unlock-fill"}></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShopManager;