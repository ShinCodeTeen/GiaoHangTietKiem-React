import axios from 'axios';

export const getShopInfo = async () => {
    try {
        let userID = sessionStorage.getItem('userID');
        const response = await axios.post('http://localhost:3001/userInfo/user', { userID });

        if (response.data.success) {
            const infoShop = response.data.shopInfo
            return{shopinfo:infoShop};
        } else {
            return false
        }
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return false;
    }
};

export const updateInfo = async (name,sdt,cccd,email,diachi)=>{
    try {
        let userID = sessionStorage.getItem('userID');
        const response = await axios.put('http://localhost:3001/userInfo/updateInfo', {
            userID,
            ten: name,
            sdt: sdt,
            cccd: cccd,
            email: email,
            diachi: diachi,
        });
        if (response.data.success) {
            return true
        } else {
          
          console.error("Lỗi khi cập nhật:", response.data.message);
          return false;
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        return false;
    }
}

