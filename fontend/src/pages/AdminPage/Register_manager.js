import './style/component.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; 

function ShipManager() {
    const [dhSearch, setDHSearch] = useState('');
   
   
    const [selectedTrangThai, setSelectedTrangThai] = useState('');
    const [errorMessage,setErrorMessage] =useState(''); 
      
    const [registers, setRegisters] = useState([])
    const [filtedRegisters, setFiltedRegisters] = useState([])
    


    useEffect(() => {
        const fetchListOrder = async () => {
            try {
                let userID = sessionStorage.getItem('userID');
                const response = await axios.post('http://localhost:3001/adminManager/getshipregister', {  });

                if (response.data.success && response.data.Registers) { 
                    setRegisters(response.data.Registers);
                    setFiltedRegisters(response.data.Registers);
                } else {
                    setErrorMessage(response.data.message || "Lỗi khi lấy dữ liệu đơn hàng."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy dữ liệu đơn hàng.');
            }
        };

        fetchListOrder(); 
       
    },[])
    const handleSearchChange=(e)=>{
        setDHSearch(e.target.value)
        if(e.target.value ===""){
            setFiltedRegisters(registers)
        }
        else{
            const filtered = registers.filter(register => {
                const searchTerm = dhSearch.toLowerCase();
                return (
                    register.mavandon.toLowerCase().includes(searchTerm) || 
                    register.tenkh.toLowerCase().includes(searchTerm) ||
                    register.sdt.toLowerCase().includes(searchTerm) 
                );
            });
            setFiltedRegisters(filtered);
    }
       
    }
    const handleStatusChange = (e) => {
        setSelectedTrangThai(e.target.value);
        const selectedStatus = e.target.value;

        if (selectedStatus === "") {
            setFiltedRegisters(registers); 
        } else {
            
            const filteredregisters = registers.filter(register => register.trangthai === selectedStatus);
            setFiltedRegisters(filteredregisters);
        }
    };
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
                            <th>Tên ứng viên</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đăng kí</th>
                            <th>Chi tiết</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtedRegisters.map(register => (
                            <tr key={register.id}>
                                <td>{register.ten}</td>
                                <td>{register.sdt}</td>
                                <td>{register.diachi}</td>
                                <td>{format(register.ngaygui, 'dd/MM/yyyy')}</td>
                                <td className='chitiet'>
                                    <Link to={`/admin_page/registerMana_info?registerId=${register.id}`}>
                                        <i className="bi bi-info-circle-fill"></i>
                                    </Link>
                                </td>
                                <td>{register.trangthai}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShipManager;