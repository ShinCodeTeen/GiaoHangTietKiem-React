// import axios from 'axios';

// import { useState,useEffect } from "react";

// const  fetchUserInfo = async () => {
//     const [userInfo, setUserInfo] = useState(null);
//     const [error, setError] = useState(null);
//         try {
//             let userID = sessionStorage.getItem('userID');
//             const response = await axios.post('http://localhost:3001/userInfo/shop', { userID });

//             if (response.data.success && response.data.shopInfo) { 
//                 setUserInfo(response.data.shopInfo);
//             } else {
//                 setError(response.data.message || "Lỗi khi lấy thông tin người dùng."); 
//             }
//         } catch (error) {
//             console.error("Lỗi khi lấy thông tin người dùng:", error);
//             setError('Đã xảy ra lỗi khi lấy thông tin người dùng.');
//         }
//         return {userInfo, error}
//     };


// export default {fetchUserInfo}