import classNames from "classnames/bind";

import styles from './ReqUserManage.module.scss'
import ListLocation from "../Component/ListLocation/ListLocation";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function ReqUserManage() {

    const [listLc, setListLc] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(
                    "https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                
                setListLc(data)
            } catch (err) {
            }
        };

        fetchLocations();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ListLocation list={listLc} titleEmpty="Request Empty" typeL={0} />
        </div>
    );
}

export default ReqUserManage;