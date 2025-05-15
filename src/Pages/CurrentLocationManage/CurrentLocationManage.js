import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { database } from "../../untils/fileBaseConfig"; // Điều chỉnh đường dẫn
import { ref, onValue } from "firebase/database";

import styles from './CurrentLocationManage.module.scss';
import ListLocation from "../Component/ListLocation/ListLocation";

const cx = classNames.bind(styles);

function CurrentLocationManage() {
    const [listLc, setListLc] = useState([]);

    useEffect(() => {
        const locationsRef = ref(database, "locations");

        const unsubscribe = onValue(
            locationsRef,
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
            <ListLocation typeL={1} titleEmpty="Current Empty" list={listLc} />
        </div>
    );
}

export default CurrentLocationManage;