import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from './CustomAction.module.scss';
import Button from "../../Button";
import { typeLocation, typeReqLocation } from "../../../assets/types";

const cx = classNames.bind(styles)

function LayerAddMarker({ center, refs, classes, type }) {

    const updateData = async () => {
        
        try {
            const response = await fetch(
                `https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lat: center[0],
                        lng: center[1],
                        typechange: typeLocation.dirty == type ? 1 : 2,
                        typeReq: typeReqLocation.add
                    }),
                }
            );

            alert("Yêu cầu thêm điểm đã được gửi.")
        }
        catch {
            alert("yêu cầu thêm điểm lỗi!!!")
        }
    };

    return (
        <div ref={refs} className={classes} >
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            <div className={cx('add-marker')}>
                <Button className={cx('btn')} onClick={updateData} title={type == 1 ? 'Thêm điểm rác' : 'Thêm điểm tái chế'} />
            </div>
        </div>
    );
}

export default LayerAddMarker;