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
function ShipManager() {
    const [dhSearch, setDHSearch] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedTrangThai, setSelectedTrangThai] = useState('');
    const [errorMessage,setErrorMessage] =useState(''); 
    const [ships, setShips] = useState([])
    const [filtedShips, setFiltedShips] = useState([])
    


    useEffect(() => {
        const fetchListOrder = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/adminManager/getShips', { });

                if (response.data.success && response.data.Ships) { 
                    setShips(response.data.Ships);
                    setFiltedShips(response.data.Ships);
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu shipper."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu shipper:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu shipper.');
            }
        };

        fetchListOrder(); 
       
    },[refreshKey])
    const handleSearchChange=(e)=>{
        setDHSearch(e.target.value)
        if(e.target.value ===""){
            setFiltedShips(ships)
        }
        else{
            const filtered = ships.filter(ship => {
                const searchTerm = dhSearch.toLowerCase();
                return (
                    ship.mavandon.toLowerCase().includes(searchTerm) || 
                    ship.tenkh.toLowerCase().includes(searchTerm) ||
                    ship.sdt.toLowerCase().includes(searchTerm) 
                );
            });
            setFiltedShips(filtered);
    }
       
    }
    const handleStatusChange = (e) => {
        setSelectedTrangThai(e.target.value);
        const selectedStatus = e.target.value;

        if (selectedStatus === "") {
            setFiltedShips(ships); 
        } else {
            
            const filted = ships.filter(ship => ship.trangthai === selectedStatus);
            setFiltedShips(filted);
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
                            <th>Mã Shipper</th>
                            <th>Họ và Tên</th>
                            <th>Trạng Thái</th>
                            <th>Chi Tiết</th>
                            <th>Đình Chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtedShips.map(ship => (
                            <tr key={ship.id}>
                                <td>{ship.userid}</td>
                                <td>{ship.ten}</td>
                                <td>{ship.trangthai==1?"Đang hoạt động":"Đình chỉ"}</td>
                                <td>
                                    <Link to={`/admin_page/shipperMana_info?ShipId=${ship.userid}`}>
                                        <i className="bi bi-info-circle-fill"></i>
                                    </Link>
                                </td>
                                <td><i onClick={()=>handleSuspend(ship.userid,ship.trangthai)} style={{ color: ship.trangthai == 0 ? 'red' : 'green' }} className={ship.trangthai==0?"bi bi-lock-fill":"bi bi-unlock-fill"}></i></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShipManager;