import classNames from "classnames/bind";
import styles from "./ListLocation.module.scss";
import ItemLocation from "./ItemLocation";
import { useEffect, useState } from "react";
import Loading from "../../../Component/Loading/Loading";

const cx = classNames.bind(styles);

function ListLocation({ list, titleEmpty, typeL }) {
    const [locations, setLocations] = useState([...list]);

    useEffect(() => {
        setLocations([...list]);
    }, [list]);

    const handleRemove = (id) => {
        setLocations((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className={cx("wrapper")}>
            {locations.length != 0 && locations != null ? (
                locations.map((item, i) => (
                    <ItemLocation
                        typeL={typeL}
                        key={i}
                        data={item}
                        onRemove={handleRemove}
                    />
                ))
            ) : (
                <div className={cx("empty")}>
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default ListLocation;
