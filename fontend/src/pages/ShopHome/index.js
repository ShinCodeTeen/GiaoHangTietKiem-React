import "./style/ShopHome.css"
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import ChangePass from"./ChangePass"
import {useState} from 'react'

function ShopHome({children,changeRoute}){
    const changeUrl = changeRoute
    const [showChangePass, setShowChangePass] = useState(false);
    const [showSideBar, setShowSideBar] = useState(true);
   
    const toogleChangePass = () => {
        setShowChangePass(!showChangePass);
    }
    const toogleSideBar = () => {
        setShowSideBar(!showSideBar);
    }
    return(
        <div>
            <Header toogleStatusSB ={toogleSideBar} />
            { showSideBar&&  <Sidebar changeRoute ={changeUrl} onStatusChangePass={toogleChangePass}/>}
            {showChangePass&& <ChangePass onClose={toogleChangePass}/>}

            {children }

        </div>
        
    )
}
export default ShopHome