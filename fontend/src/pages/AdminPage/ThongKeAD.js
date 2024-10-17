import { useEffect, useState } from 'react';
import './style/component.css'
import axios from 'axios';
import numeral from 'numeral';

function ThongKe(){
    const [slShipAc,setSlShipAc] = useState()
    const [slShopAc,setSlShopAc] = useState()
    const [slShipActivate,setSlShipActivate] = useState()
    const [slShopActivate,setSlShopActivate] = useState()
    const [slWaitOrder,setSlWaitOrder] = useState()
    const [slShippingOrder,setSlShippingOrder] = useState()
    const [slShippedOrder,setSlShippedOrder] = useState()
    const [totalOrder,setTotalOrder] = useState()
    const [totalShip,setTotalShip] = useState()
    const [totalCoD,setTotalCoD] = useState()

    const [totalProduct,setTotalProduct] = useState()
    const [errorMessage,setErrorMessage]=useState('')


    useEffect(()=>{
        const fetchAdminStatis1 = async () => {
            try {
                const resShopAc = await axios.get('http://localhost:3001/adminStatis/shopac');
                const resShipAc = await axios.get('http://localhost:3001/adminStatis/shipac');
                const resShopActivate = await axios.get('http://localhost:3001/adminStatis/shopActivate');
                const resShipActivate = await axios.get('http://localhost:3001/adminStatis/shipActivate');
                const resTotalShippingFee = await axios.get('http://localhost:3001/adminStatis/totalShippingFee');

     
                if (resShopAc.data.success && resShipAc.data.success && resShopActivate.data.success&& resShipActivate.data.success) { 
                   
                    const countShop = resShopAc.data.countShop
                    const countShip = resShipAc.data.countShipper
                    const countShipActivate = resShipActivate.data.activateShip
                    const countShopActivate = resShopActivate.data.activateShop
                    const totalShip = resTotalShippingFee.data.totalShippingFee
                    setSlShopAc(countShop.slShop)
                    setSlShipAc(countShip.slShipper)
                    setSlShipActivate(countShipActivate.slShipActivate)
                    setSlShopActivate(countShopActivate.slShopActivate)
                    setTotalShip(totalShip.tongShip)
                } else {
                    setErrorMessage( "Lỗi khi lấy dữ liệu."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng.');
            }
        };

        fetchAdminStatis1(); 
    },[])
    
    useEffect(()=>{
        const fetchAdminStatis2 = async () => {
            try {
                
                const resWaitOrder = await axios.get('http://localhost:3001/adminStatis/waitOrder');
                const resShippingOrder = await axios.get('http://localhost:3001/adminStatis/shippingOrder');
                const resShippedOrder = await axios.get('http://localhost:3001/adminStatis/shippedOrder');
                const restTotalOrder=await axios.get('http://localhost:3001/adminStatis/totalOrder');
                const resTotalProduct = await axios.get('http://localhost:3001/adminStatis/totalProduct');
                const resTotalCoD = await axios.get('http://localhost:3001/adminStatis/totalCoD');

                if (resWaitOrder.data.success && resShippingOrder.data.success && resShippedOrder.data.success) { 
                    const WaitOrder = resWaitOrder.data.waitOrder
                    const ShippingOrder = resShippingOrder.data.shippingOrder
                    const ShippedOrder = resShippedOrder.data.shippedOrder
                    const TotalOrder = restTotalOrder.data.totalOrder
                    const TotalProduct = resTotalProduct.data.totalProduct
                    const TotalCoD = resTotalCoD.data.totalCoD

                    setSlWaitOrder(WaitOrder.slWaitOrder)
                    setSlShippedOrder(ShippedOrder.slShippedOrder)
                    setSlShippingOrder(ShippingOrder.slShippingOrder)
                    setTotalOrder(TotalOrder.tongdon)
                    setTotalCoD(TotalCoD.tongCoD)
                    setTotalProduct(TotalProduct.tongSP)
                   
                } else {
                    setErrorMessage( "Lỗi khi lấy dữ liệu."); 
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng.');
            }
        };
        
        fetchAdminStatis2(); 
    },[])

    return (
        <div id="ThongKe">
            <div className='bt_tk'>

            </div>
            <div className='content_tk'>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Shop</h3>
                    </div>
                    <div className='tk'>
                        <p>{slShopAc?slShopAc:0}   Tài khoản </p> <br/>
                        <p>{slShopActivate?slShopActivate:0}   Shop hoạt động</p> <br/>
                        <p>{totalOrder?totalOrder:0}   Đơn hàng được gửi đi </p><br/>
                    </div>
                </div>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Shipper</h3>
                    </div>
                    <div className='tk'>
                        <p>{slShipAc?slShipAc:0} Tài Khoản</p> <br/>
                        <p>{slShipActivate?slShipActivate:0} Shipper hoạt động</p> <br/>
                        <p>{slShippedOrder?slShippedOrder:0} Đơn hàng được giao </p><br/>
                    </div>

                </div>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>Hàng Hóa</h3>
                    </div>
                    <div className='tk'>
                        <p>{slWaitOrder?slWaitOrder:0} Đơn hàng chờ giao</p> <br/>
                        <p>{slShippingOrder?slShippingOrder:0} Đơn hàng đang giao</p> <br/>
                        <p>{totalProduct?totalProduct:0} Sản phẩm được giao </p><br/>
                    </div>

                </div>
                <div className='info_tk'>
                    <div className='text_ct'>
                        <h3>CoD & Shipping Fee</h3>
                    </div>
                    <div className='tk'>
                        <p>{totalCoD?numeral(totalCoD).format('0,0')+" Đ":0+" Đ"} Tổng CoD</p> <br/>
                        <p>{totalShip?numeral(totalShip).format('0,0')+" Đ":0+" Đ"} Phí giao hàng</p> <br/>
                        
                    </div>

                </div>
           </div>
          
        </div>
    )
}
export default ThongKe