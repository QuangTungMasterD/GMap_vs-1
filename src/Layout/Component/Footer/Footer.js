import classNames from "classnames/bind";

import styles from './Footer.module.scss'
import FooterList from "./FooterList/FooterList";

const cx = classNames.bind(styles);

const footL = [
    {
        header: "Liên hệ",
        titleList: [
            {
                title: "Facebook trưởng nhóm",
                link: "https://www.facebook.com/profile.php?id=100074385916851"
            },
            {
                title: "SDT: 0919134046"
            },
            {
                title: "qynh.huog.13.11.2005@gmail.com"
            }
        ]
    },
    {
        header: "Hoa hướng dương",
        titleList: [
            {
                title: "Quang Tùng MasterD",
                link: "https://www.facebook.com/tran.quang.tung.716688"
            },
            {
                title: "Do Ho Na",
                link: "https://www.facebook.com/hoai.nam.276081"
            },
            {
                title: "Hồ Xuân Hương",
                link: "https://www.facebook.com/profile.php?id=100074385916851"
            },
            {
                title: "Trang Đốp",
                link: "https://www.facebook.com/htt.1510"
            },
            {
                title: "Minh Thông là ai?",
                link: "https://www.facebook.com/thong.ng.9085"
            },
            {
                title: "Starnow",
                link: "https://www.facebook.com/vinh.pham.842303"
            },
            {
                title: "Phạm Xuân Tùng",
            }
        ]
    }
]

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-footer')}>
                {
                    footL.map((item, i) => {
                        return <FooterList list={item} key={i} />
                    })
                }
            </div>
            <div className={cx('make-by')}>
                &copy; Make by Hoa Hướng Dương - With love ❤️
            </div>
        </div>
    );
}

export default Footer;