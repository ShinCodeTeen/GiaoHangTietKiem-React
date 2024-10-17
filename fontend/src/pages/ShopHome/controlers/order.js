import axios from 'axios';
export const getListOrder = async ()=>{
    try {
        let userID = sessionStorage.getItem('userID');
        const response = await axios.post('http://localhost:3001/shopOrder/getOrder', { userID });

        if (response.data.success && response.data.orders) { 
            return {listOrder:response.data.orders,
                    success : response.data.success};
        } else {
            return {listOrder:""}
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
        return {listOrder:""}
    }
}