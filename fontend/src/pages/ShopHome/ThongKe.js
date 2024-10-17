import { useEffect, useState } from 'react';
import './style/componentCss.css'
import axios from 'axios';
import numeral from 'numeral';
function ThongKe(){
    const [slDonCho,setSlDonCho] = useState()
    const [slDonDangGiao,setSlDonDangGiao] = useState()
    const [slDonDaGiao,setSlDonDaGiao] = useState()
    const [slSpCho,setSlSpCho] = useState()
    const [slSpDangGiao,setSlSpDangGiao] = useState()
    const [slSpDaGiao,setSlSpDaGiao] = useState()
    const [coDCho,setCoDCho] = useState()
    const [coDDangGiao,setCoDDangGiao] = useState()
    const [coDDaGiao,setCoDDaGiao] = useState()
    const [phiShipGiao,setPhiShipGiao] = useState()
    const [phiShipHoan,setPhiShipHoan] = useState()
    const [errorMessage,setErrorMessage] =useState(''); 
    const userID = sessionStorage.getItem('userID');
    useEffect(()=>{
        const fetchStatistical1 = async () => {
            try {
                
                const resAwait = await axios.post('http://localhost:3001/statistical/waitOrder',{userid:userID});
                const resShipping = await axios.post('http://localhost:3001/statistical/shippingOrder',{userid:userID});
                const resShipped = await axios.post('http://localhost:3001/statistical/shippedOrder',{userid:userID});
     
                if (resAwait.data.success && resShipping.data.success && resShipped.data.success) { 
                   
                    const awaitOrder = resAwait.data.waitOrder
                    const shippingOrder = resShipping.data.shippingOrder
                    const shippedOrder = resShipped.data.shippedOrder
                    setCoDCho(awaitOrder.tongCoDCho)
                    setSlDonCho(awaitOrder.slCho)
                    setCoDDaGiao(shippedOrder.tongCoDShipped)
                    setSlDonDaGiao(shippedOrder.slShipped)
                    setCoDDangGiao(shippingOrder.tongCoDShip)
                    setSlDonDangGiao(shippingOrder.slShip)
                   
                } else {
                    setErrorMessage( "Lỗi khi lấy dữ liệu."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng.');
            }
        };

        fetchStatistical1(); 
    },[])
    
    useEffect(()=>{
        const fetchStatistical2 = async () => {
            try {
                
                const resShipping = await axios.post('http://localhost:3001/statistical/countShipping',{userid:userID});
                const resAwait = await axios.post('http://localhost:3001/statistical/countWait',{userid:userID});
                const resShipped = await axios.post('http://localhost:3001/statistical/countShipped',{userid:userID});
                const restShipCost=await axios.post('http://localhost:3001/statistical/sumShip',{userid:userID});
                if (resAwait.data.success && resShipping.data.success && resShipped.data.success) { 
                    const waitProduct = resAwait.data.waitProduct
                    const shippingProduct = resShipping.data.shippingProduct
                    const shippedProduct = resShipped.data.shippedProduct
                    const shipCost = restShipCost.data.sumShip
                    setSlSpCho(waitProduct.SPCho);
                    setSlSpDaGiao(shippedProduct.SPShipped);
                    setPhiShipGiao(shipCost.tongShip);
                    setSlSpDangGiao(shippingProduct.SPShip);
                   
                } else {
                    setErrorMessage( "Lỗi khi lấy dữ liệu."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng.');
            }
        };
        
        fetchStatistical2(); 
    },[])

    return (
        <div id="ThongKe">
            <div className='bt_tk'>

            </div>
            <div className='content_tk'>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Chờ giao</h3>
                    </div>
                    <div className='tk'>
                        <p>{slDonCho?slDonCho:0}   ĐH</p> <br/>
                        <p>{slSpCho?slSpCho:0}   SP</p> <br/>
                        <p>{numeral(coDCho).format('0,0')+" Đ"}   CoD </p><br/>
                    </div>
                </div>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Thành công</h3>
                    </div>
                    <div className='tk'>
                        <p>{slDonDaGiao?slDonDaGiao:0} ĐH</p> <br/>
                        <p>{slSpDaGiao?slSpDaGiao:0} SP</p> <br/>
                        <p>{coDDaGiao?numeral(coDDaGiao).format('0,0')+" Đ":0 +" Đ"} CoD </p><br/>
                    </div>

                </div>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Đang giao</h3>
                    </div>
                    <div className='tk'>
                        <p>{slDonDangGiao?slDonDangGiao:0} ĐH</p> <br/>
                        <p>{slSpDangGiao?slSpDangGiao:0} SP</p> <br/>
                        <p>{coDDangGiao?numeral(coDDangGiao).format('0,0')+" Đ":0 +" Đ"} CoD </p><br/>
                    </div>

                </div>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Phí vận chuyển</h3>
                    </div>
                    <div className='tk'>
                        <p>{phiShipGiao?numeral(phiShipGiao).format('0,0')+" Đ":0+"Đ"} Giao</p> <br/>
                        <p>{phiShipHoan?numeral(phiShipHoan).format('0,0')+" Đ":0+"Đ"} Hoàn</p> <br/>
                        
                    </div>

                </div>
           </div>
          
        </div>
    )
}
export default ThongKe