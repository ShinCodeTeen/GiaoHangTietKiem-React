import "./style/ShipHome.css"
import HeaderShip from "./HeaderShip.js";
import SidebarShip from "./SidebarShip.js";
import ChangePass_Ship from"./ChangePassWord.js"
import {useState} from 'react'

function ShipHome({children,changeRoute}){
    const changeUrl = changeRoute
    const [changePassWord, setShowChangePassWord] = useState(false);
   
   
    const toogleChangePass = () => {
        setShowChangePassWord(!changePassWord);
    }
   
    return(
        <div>
            <HeaderShip/>
            <SidebarShip changeRoute ={changeUrl} onStatusChangePass={toogleChangePass}/>
            {changePassWord && <ChangePass_Ship onToogle={toogleChangePass}/>}

            {children}

        </div>
        
    )
}
export default ShipHome