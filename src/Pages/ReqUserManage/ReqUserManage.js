import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { database } from "../../untils/fileBaseConfig"; // Điều chỉnh đường dẫn
import { ref, onValue } from "firebase/database";

import styles from './ReqUserManage.module.scss';
import ListLocation from "../Component/ListLocation/ListLocation";

const cx = classNames.bind(styles);

function ReqUserManage() {
    const [listLc, setListLc] = useState([]);

    useEffect(() => {
        const reqLocationsRef = ref(database, "reqAddLocations");

        const unsubscribe = onValue(
            reqLocationsRef,
            (snapshot) => {
                try {
                    const data = snapshot.val();
                    if (data) {
                        const locationsArray = Object.keys(data).map((key) => ({
                            id: key,
                            ...data[key],
                        }));
                        setListLc(locationsArray);
                    } else {
                        setListLc([]);
                    }
                } catch (err) {
                    console.error("Lỗi khi lấy dữ liệu từ Firebase:", err);
                    setListLc([]);
                }
            },
            (err) => {
                console.error("Lỗi kết nối Firebase:", err);
                setListLc([]);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ListLocation list={listLc} titleEmpty="Request Empty" typeL={0} />
        </div>
    );
}

export default ReqUserManage;