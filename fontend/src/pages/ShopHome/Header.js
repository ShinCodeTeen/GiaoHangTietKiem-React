import {useState} from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './style/ShopHome.css'
import logo from '../../assets/img/logo.svg'
import icon_tk from '../../assets/img/thongke.png'
import TaoDon from './TaoDon';
import { Link } from 'react-router-dom';

function Header({toogleStatusSB}){
   
    const [showTaoDon, setShowTaoDon] = useState(false);
    const handleCreateOrder = () => {
        setTimeout(()=>{
            setShowTaoDon(true);
            toogleStatusSB()
        },600)
       
    };

    const handleCloseTaoDon = () => {
        setShowTaoDon(false);
        toogleStatusSB()
    };
    return (
        <div id='header_shop'>
            <img className="logo" src={logo}/>
            <div className="icon_div">
            <Tippy content="Tổng quan">
                <a href='/shop_page'><i className="bi bi-bar-chart-fill"></i></a>
            </Tippy>
            <Tippy content="Đơn hàng">
                <a href='/shop_page/don_hang'><i className="bi bi-receipt-cutoff"></i></a>
            </Tippy>
            </div>
            <button onClick={handleCreateOrder} ><i className="bi bi-plus-lg"></i>Tạo ĐH</button>
            {showTaoDon && <TaoDon onClose={handleCloseTaoDon} />} 
        </div>
    )
}

export default Header