import classNames from "classnames/bind";

import styles from './SideLayout.module.scss'
import Header from "../Component/Header";
import SideBar from "../Component/SideBar/SideBar";

const cx = classNames.bind(styles)

function SideLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className={cx('container')}>
                <div className={cx('side')}>
                    <SideBar />
                </div>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SideLayout;