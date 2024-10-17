import '../Login.css'
import logo from '../../../assets/img/logo.png'

function Footer(){
    return(
        <div id='foot_lg'>
            <div className='foot_content'>
                <img src={logo}/>
                <h3>CÔNG TY CỔ PHẦN GIAO HÀNG TIẾT KIỆM</h3>
                <a>Về chúng tôi</a>
                <a>Tuyển dụng <br/></a>
                <a>Dịch vụ </a>
                <a>Quy định chung <br/></a>
                <a>Chính sách bảo mật </a>
            </div>
            <div className='foot_intro'>
                <h3>CÔNG TY CỔ PHẦN GIAO HÀNG TIẾT KIỆM</h3>
                <p>Giấy CNĐKKD: 0106181807 - Ngày cấp 21/05/2013, đăng ký kinh doanh thay đổi lần 11 ngày 07/09/2022.</p>
                <p>Cơ quan cấp: Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư TP Hà Nội</p>
                <p>Giấy phép bưu chính số 346/GP-BTTTT do Bộ TT&TT cấp ngày 23/08/2019</p>
                <p>Văn bản xác nhận thông báo hoạt động bưu chính của 62 chi nhánh trên toàn quốc</p>
                <p>Địa chỉ trụ sở chính: Tòa nhà VTV, số 8 Phạm Hùng, phường Mễ Trì, quận Nam Từ Liêm, thành phố Hà Nội, Việt Nam</p>
                <p>Hotline: 1900 6092</p>

            </div>
        </div>

    )
}
export default Footer