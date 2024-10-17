import ShopHome from '../pages/ShopHome/index';
import ShipHome from '../pages/ShipHome/index';
import AdminHome from '../pages/AdminPage';

import ShopInfo from '../pages/ShopHome/ShopInfo';
import ShipInfo from '../pages/ShipHome/ShipInfo';


import ThongKe from '../pages/ShopHome/ThongKe'
import DonHang from '../pages/ShopHome/DonHang';
import OrderInfo from '../pages/ShopHome/OrderInfo';

import NhanDon from '../pages/ShipHome/NhanDon';
import DonNhan from '../pages/ShipHome/DonNhan';
import ShipOrder from '../pages/ShipHome/OrderInfo';
import UpdateOrder from '../pages/ShipHome/UpdateOrder';

import ThongKeAD from '../pages/AdminPage/ThongKeAD'
import ShopMana from '../pages/AdminPage/Shop_manager'
import ShipMana from '../pages/AdminPage/Ship_manager'
import ResgisterMana from '../pages/AdminPage/Register_manager'
import ShopManaInfo from '../pages/AdminPage/ShopInfoMana'
import ShipManaInfo from '../pages/AdminPage/ShipInfoMana'
import RegisterInfo from '../pages/AdminPage/ResgisterInfo'

const appRoutes=[
    { 
        path:'/shop_page',
        component: ThongKe,
        layout: ShopHome
    },
    { 
        path:'/shop_page/don_hang',
        component: DonHang,
        layout: ShopHome
    },
    { 
        path:`/shop_page/order_info`,
        component: OrderInfo,
        layout: ShopHome
    },
    {
        path:'/shop_page/shop_info',
        component: ShopInfo,
        layout: ShopHome
    },
 
    
    {
        path:'/ship_page',
        component: NhanDon,
        layout: ShipHome,

    },
    {
        path:'/ship_page/don_nhan',
        component: DonNhan,
        layout: ShipHome,

    },
    {
        path:'/ship_page/ship_info',
        component: ShipInfo,
        layout: ShipHome
    },
    {
        path:'/ship_page/order_info',
        component: ShipOrder,
        layout: ShipHome
    },
    {
        path:'/ship_page/updateOrder',
        component: UpdateOrder,
        layout: ShipHome
    },
    {
        path:'/ship_page/',
        component: NhanDon,
        layout: ShipHome
    },
    {
        path:'/admin_page/',
        component: ThongKeAD,
        layout: AdminHome
    },
    {
        path:'/admin_page/shop_managerment',
        component: ShopMana,
        layout: AdminHome
    },
    {
        path:'/admin_page/shipper_managerment',
        component: ShipMana,
        layout: AdminHome
    },
    {
        path:'/admin_page/register_managerment',
        component: ResgisterMana,
        layout: AdminHome
    },
    {
        path:'/admin_page/shopMana_info',
        component: ShopManaInfo,
        layout: AdminHome
    },
    {
        path:'/admin_page/shipperMana_info',
        component: ShipManaInfo,
        layout: AdminHome
    },
    {
        path:'/admin_page/registerMana_info',
        component: RegisterInfo,
        layout: AdminHome
    },
]

export {appRoutes}
