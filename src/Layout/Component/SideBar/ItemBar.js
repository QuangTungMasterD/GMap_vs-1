import classNames from "classnames/bind";

import styles from './SideBar.module.scss'
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles)

function ItemBar({ to, title }) {
    return (
        <NavLink className={(nav) => cx('wrapper-item', {
            active: nav.isActive
        })} to={to}>
            <div className={cx('item-bar')}>
                <div className={cx('icon-left')}>
                </div>
                <div className={cx('title')}>
                    {title}
                </div>
                <div className={cx('icon-right')}>

                </div>
            </div>
        </NavLink>
    );
}

export default ItemBar;