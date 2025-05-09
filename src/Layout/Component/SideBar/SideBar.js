import classNames from "classnames/bind";

import styles from './SideBar.module.scss'
import ItemBar from "./ItemBar";

const cx = classNames.bind(styles)

function SideBar({ listBar }) {
    return (
        <div className={cx('wrapper')}>
            <ItemBar to="/manager/req" title="request location" />
            <ItemBar to="/manager/cur" title="current location" />
        </div>
    );
}

export default SideBar;