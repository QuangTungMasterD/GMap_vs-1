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
        // Tham chiếu đến node 'locations' trong Firebase Realtime Database
        const locationsRef = ref(database, "locations");

        // Lắng nghe thay đổi dữ liệu theo thời gian thực
        const unsubscribe = onValue(
            locationsRef,
            (snapshot) => {
                try {
                    const data = snapshot.val();
                    if (data) {
                        // Chuyển đổi object từ Firebase thành mảng
                        const locationsArray = Object.keys(data).map((key) => ({
                            id: key,
                            ...data[key],
                        }));
                        setListLc(locationsArray);
                    } else {
                        setListLc([]); // Nếu không có dữ liệu, đặt mảng rỗng
                    }
                } catch (err) {
                    console.error("Lỗi khi lấy dữ liệu từ Firebase:", err);
                    setListLc([]); // Đặt mảng rỗng nếu có lỗi
                }
            },
            (err) => {
                console.error("Lỗi kết nối Firebase:", err);
                setListLc([]); // Đặt mảng rỗng nếu có lỗi kết nối
            }
        );

        // Dọn dẹp listener khi component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ListLocation typeL={1} titleEmpty="Current Empty" list={listLc} />
        </div>
    );
}

export default CurrentLocationManage;