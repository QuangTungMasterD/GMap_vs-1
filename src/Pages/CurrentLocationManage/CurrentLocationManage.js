import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import ListLocation from "../Component/ListLocation/ListLocation";

import styles from './CurrentLocationManage.module.scss'

const cx = classNames.bind(styles);

function CurrentLocationManage() {

    const [listLc, setListLc] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(
                    "https://680db89fc47cb8074d9106d1.mockapi.io/Locations"
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
            <ListLocation typeL={1} titleEmpty="Current Empry" list={listLc} />
        </div>
    );
}

export default CurrentLocationManage;