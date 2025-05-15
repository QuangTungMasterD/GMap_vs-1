import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { database } from "../../../untils/fileBaseConfig"; 
import { ref, push, set } from "firebase/database";

import styles from './CustomAction.module.scss';
import Button from "../../Button";
import { typeLocation, typeReqLocation } from "../../../assets/types";
import { useContext } from "react";
import { ToastContext } from "../../../contexts/ToastProvider/ToastProvider";

const cx = classNames.bind(styles);

function LayerAddMarker({ center, refs, classes, type }) {
    const { toast } = useContext(ToastContext);

    const updateData = async () => {
        toast.warning('Yêu cầu đang được gửi đi');
        try {
            
            const reqLocationsRef = ref(database, "reqAddLocations");
            const newRequestRef = push(reqLocationsRef); 
            await set(newRequestRef, {
                lat: center[0],
                lng: center[1],
                typechange: typeLocation.dirty == type ? 1 : 2,
                typeReq: typeReqLocation.add,
                desc: ''
            });

            toast.success("Yêu cầu đã được gửi đi");
        } catch (error) {
            toast.error("Yêu cầu gửi bị lỗi");
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    return (
        <div ref={refs} className={classes}>
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className={cx('add-marker')}>
                <Button className={cx('btn')} onClick={updateData} title={type == 1 ? 'Thêm điểm rác' : 'Thêm điểm tái chế'} />
            </div>
        </div>
    );
}

export default LayerAddMarker;