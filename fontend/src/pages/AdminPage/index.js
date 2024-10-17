import "./style/ShipHome.css"
import HeaderAdmin from "./HeaderAdmin.js";
import SidebarAdmin from "./SidebarAdmin.js";

import {useState} from 'react'
function AdminHome({children,changeRoute}){
    const changeUrl = changeRoute
    const [changePassWord, setShowChangePassWord] = useState(false);
   
   
   
    return(
        <div>
            <HeaderAdmin/>
            <SidebarAdmin changeRoute ={changeUrl} />
            

            {children}

        </div>
        
    )
}
export default AdminHome