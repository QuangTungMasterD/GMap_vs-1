import classNames from "classnames/bind";

import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('form-input')}>
                    <label for="username">Tên đăng nhập</label>
                    <input className={cx('input-login')} placeholder="Nhập tên đăng nhập" id="username" />
                </div>
                <div className={cx('form-input')}>
                    <label for="password">Mật khẩu</label>
                    <input className={cx('input-login')} placeholder="Nhập mật khẩu" id="password" />
                </div>
            </div>
        </div>
    );
}

export default Login;