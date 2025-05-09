import classNames from "classnames/bind";

import styles from './Home.module.scss'
import BannerImage from '../../assets/images/BannerImage';
import SlideShow from "../../Component/Banner";
import TitleWeb from "./Component/TitleWeb/TitleWeb";

const cx = classNames.bind(styles);

const titleW = [
    {
        imgRight: true,
        title: "GMap",
        primary: true,
        image: require("../../assets/images/logo.png"),
        desc: "Chào mừng bạn đến với trang web quản lý rác thải, nơi chúng tôi kết nối cộng đồng với các giải pháp bền vững cho môi trường. Với mục tiêu tạo ra một thành phố sạch đẹp hơn, trang web của chúng tôi cung cấp các công cụ dễ dàng để thêm, xóa và quản lý các điểm rác, khu xử lý rác và các hoạt động tái chế. Người dùng có thể tương tác trực tiếp trên bản đồ, tham gia vào các sự kiện dọn dẹp cộng đồng và chia sẻ ý tưởng về bảo vệ môi trường. Hãy cùng nhau hành động để xây dựng một tương lai xanh hơn!"
    },
    {
        imgLeft: true,
        title: "Clean place - Điểm sạch",
        small: true,
        image: require("../../assets/images/clean.png"),
        desc: ""
    },
    {
        imgLeft: true,
        title: "Dirty place - điểm có rác",
        small: true,
        image: require("../../assets/images/dirty.png"),
        desc: ""
    },
    {
        imgLeft: true,
        title: "Recycle place - điểm tái chế/Xử lý rác",
        small: true,
        image: require("../../assets/images/recycle.png"),
        desc: ""
    }
]

function Home({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner-show')}>
                <SlideShow list={BannerImage} />
            </div>
            <div className={cx('content')}>
                {titleW.map((item, i) => {
                    let prop = {};
                    if (item.primary) {
                        prop = {primary: true};
                    }
                    else if(item.blue) {
                        prop = {blue: true}
                    }

                    if(item.small) {
                        prop = {...prop, small: true};
                    }

                    return <TitleWeb item={item} key={i} {...prop} />
                })}
            </div>
        </div>
    );
}

export default Home;
