import classNames from "classnames/bind";

import styles from './Login.module.scss'
import Button from '../../Component/Button'
import { useContext, useEffect, useState } from "react";
import { adminContext } from "../../contexts/AdminProvider/AdminProvider";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastProvider/ToastProvider";

const cx = classNames.bind(styles)

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [admins, setAdmins] = useState([]);
    const { admin, setAdmin } = useContext(adminContext)
    const navigateHome = useNavigate();
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        const getAdmin = async () => {
            const repon = await fetch('https://680db89fc47cb8074d9106d1.mockapi.io/Amin');
            const data = await repon.json();
            setAdmins(data);
        };
        getAdmin();
    }, []);

    const handlerClickLogin = (e) => {
        const validateInput = e.target.parentElement.querySelectorAll('p');
        let textUser = '';
        let textPass = '';
        if(username === '') {
            textUser = "Vui lòng nhập tài khoản!";
        }
        if(password === '') {
            textPass = "Vui lòng nhập mật khẩu!";
        }
        if(username !== '' && password !== '') {
            for(var i = 0; i < admins.length; i++) {
                if(username !== admins[i].username || password !== admins[i].password) {
                    textUser = "Sai tài khoản hoặc mật khẩu";
                    textPass = "Sai tài khoản hoặc mật khẩu";
                }
                else {
                    setAdmin(true);
                    textPass = '';
                    textUser = '';
                    toast.success("Đăng nhập thành công");
                    navigateHome('/');
                    break;
                }
            }
        }
        validateInput[0].innerText = textUser;
        validateInput[1].innerText = textPass;
    }

    const handlerOnChange = (e) => {
        e.target.parentElement.querySelector('p').innerText = ''
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <h3 className={cx('head-form')}>Chỉ dành cho Admin!!!</h3>
                <div className={cx('form-input')}>
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input onChange={(e) => {
                        setUsername(e.target.value)
                        handlerOnChange(e)
                    }} value={username} className={cx('input-login')} placeholder="Nhập tên đăng nhập" id="username" />
                    <p className={cx('validate')}></p>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" onChange={(e) => {
                        setPassword(e.target.value)
                        handlerOnChange(e)
                    }} value={password} className={cx('input-login')} placeholder="Nhập mật khẩu" id="password" />
                    <p className={cx('validate')}></p>
                </div>
                <Button onClick={e => handlerClickLogin(e)} classN={cx('btn-login')} title="Đăng nhập" />
            </div>
        </div>
    );
}

export default Login;