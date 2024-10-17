import {useState} from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './style/ShipHome.css'
import logo from '../../assets/img/logo.svg'
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
            
        </div>
    )
}

export default Header