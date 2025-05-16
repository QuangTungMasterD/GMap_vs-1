import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { adminContext } from "../../../contexts/AdminProvider/AdminProvider";

import styles from './Header.module.scss';
import { useContext } from "react";

const cx = classNames.bind(styles);

function Header() {
    const { admin, setAdmin } = useContext(adminContext)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('nav-bar')}>
                    <NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                    })} href="/" to="/">
                        <img alt="" className={cx('image-logo')} src={require('../../../assets/images/LOGO-Text.png')} />
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
                    {admin ? (<NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                    })} href="/manager/req" to="/manager/req">
                        Manager
                    </NavLink>): ''}
                </div>
                <div className={cx('action')}>
                    {!admin ? 
                        <NavLink className={(nav) => cx('link', {
                        active: nav.isActive
                        })} href="/Login" to="/Login">
                            Login
                        </NavLink> :
                        ''
                        
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;