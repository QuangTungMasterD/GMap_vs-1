import classNames from "classnames/bind";

import styles from './DefaultLayout.module.scss'
import Header from "../Component/Header";
import Footer from "../Component/Footer/Footer";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;