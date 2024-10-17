import { useEffect } from 'react';
import './Login.css';
import axios from 'axios';


function LocalPage(){

  
    return(
        <div id='LocalPage'>
            <div className='select_user'>
                <h2>Chào mừng bạn đến với hệ thống</h2>
                <h3>Tiếp tục với tư cách?</h3>
                <div className='options'>
                    <div className='opt_user'>
                        <a href='/shop_login'>Tôi là nhà bán hàng</a>
                    </div>
                    <div className='opt_user'>
                        <a href='/ship_login'>Tôi là người giao hàng</a>
                    </div>
                    <div className='opt_user'>
                        <a href='/admin_login'>Tôi là admin</a>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default LocalPage