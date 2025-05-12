import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('nav-bar')}>
                    <NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                    })} href="/" to="/">
                        <img className={cx('image-logo')} src={require('../../../assets/images/LOGO-Text.png')} />
                    </NavLink>
                    <NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                    })} href="/" to="/">
                        Home
                    </NavLink>
                    <NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                    })} href="/Map" to="/Map">
                        Map
                    </NavLink>
                    {isLocalhost ? (<NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                    })} href="/manager/req" to="/manager/req">
                        Manager
                    </NavLink>): ''}
                </div>
                <div className={cx('action')}>

                </div>
            </div>
        </div>
    );
}

export default Header;