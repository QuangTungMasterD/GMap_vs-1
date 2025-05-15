import classNames from "classnames/bind";
import { database } from "../../../untils/fileBaseConfig"; // Điều chỉnh đường dẫn
import { ref, update, push, set, remove } from "firebase/database";

import styles from "./ListLocation.module.scss";
import { typeLocation, typeReqLocation } from "../../../assets/types";
import Button from "../../../Component/Button";
import { useContext, useState } from "react";
import { ToastContext } from "../../../contexts/ToastProvider/ToastProvider";

const cx = classNames.bind(styles);

function ItemLocation({ data, onRemove, typeL }) {
    const [desc, setDesc] = useState(data.desc ? data.desc : '');
    const { toast } = useContext(ToastContext);

    const handlerAllowReq = async (type, typeReq) => {
        let isNext = window.confirm("Bạn có chắc chắn tiếp tục?");
        if (!isNext) return;
        toast.warning("Yêu cầu đang được gửi đi");

        try {
            if (typeL == 0) {
                if (typeReq == 1) { // typeReq == "change"
                    // Cập nhật location hiện có (PUT)
                    const locationRef = ref(database, `locations/${data.idLocation}`);
                    await update(locationRef, {
                        type: type,
                        lat: data.lat,
                        lng: data.lng,
                        desc: desc
                    });

                    // Xóa yêu cầu từ reqAddLocations (DELETE)
                    const reqRef = ref(database, `reqAddLocations/${data.id}`);
                    await remove(reqRef);
                    onRemove(data.id);
                } else if (typeReq == 0) { // typeReq == "add"
                    // Thêm location mới (POST)
                    const locationsRef = ref(database, "locations");
                    const newLocationRef = push(locationsRef); // Tạo ID tự động
                    await set(newLocationRef, {
                        id: newLocationRef.key,
                        type: type,
                        lat: data.lat,
                        lng: data.lng,
                        desc: desc
                    });

                    // Xóa yêu cầu từ reqAddLocations (DELETE)
                    const reqRef = ref(database, `reqAddLocations/${data.id}`);
                    await remove(reqRef);
                    onRemove(data.id);
                } else if (typeReq === 2) { // typeReq == "remove"
                    // Xóa yêu cầu từ reqAddLocations (DELETE)
                    const reqRef = ref(database, `reqAddLocations/${data.id}`);
                    await remove(reqRef);

                    if (type == 2) {
                        // Xóa location từ locations (DELETE)
                        const locationRef = ref(database, `locations/${data.idLocation}`);
                        await remove(locationRef);
                    }
                    onRemove(data.id);
                } else {
                    throw new Error("Lỗi logic typeReq");
                }
            } else if (typeL == 1) {
                // Xóa location từ locations (DELETE)
                const locationRef = ref(database, `locations/${data.id}`);
                await remove(locationRef);
                onRemove(data.id);
            }

            toast.success("Yêu cầu thành công");
        } catch (error) {
            toast.error("Yêu cầu không thành công");
            console.error("Lỗi khi xử lý yêu cầu:", error);
        }
    };

    const handlerUpdateLoc = async () => {
        let isNext = window.confirm("Bạn có chắc chắn tiếp tục?");
        if (!isNext) return;
        toast.warning("Yêu cầu đang được gửi đi");

        try {
            // Cập nhật mô tả của location (PUT)
            const locationRef = ref(database, `locations/${data.id}`);
            await update(locationRef, {
                type: data.type, // Giữ nguyên type
                lat: data.lat,
                lng: data.lng,
                desc: desc
            });

            toast.success("Yêu cầu thành công");
        } catch (error) {
            toast.error("Yêu cầu không thành công");
            console.error("Lỗi khi cập nhật location:", error);
        }
    };

    const handlerDesc = (e) => {
        setDesc(e.target.value);
    };

    return (
        <div className={cx("item-req")}>
            <div className={cx("item-location")}>
                <p className={cx("location-lat")}>lat: {data.lat}</p>
                <p className={cx("location-lng")}>lng: {data.lng}</p>
            </div>
            <div className={cx("gg-map")}>
                <a
                    target="_blank"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`}
                    rel="noreferrer"
                >
                    xem trên ggmap
                </a>
            </div>
            {typeL == 0 ? (
                <div className={cx("item-type")}>
                    <p className={cx("type-req")}>
                        {typeReqLocation.add == data.typeReq
                            ? "add"
                            : typeReqLocation.change == data.typeReq
                            ? "change"
                            : "remove"}
                        :{" "}
                        {typeLocation.clean == data.typechange
                            ? "clean"
                            : typeLocation.dirty == data.typechange
                            ? "dirty"
                            : "cycle"}
                    </p>
                </div>
            ) : <></>}
            <div className={cx('desc')}>
                <input
                    placeholder="Nhập gì đó :))"
                    value={desc}
                    onChange={(e) => handlerDesc(e)}
                    className={cx('input-desc')}
                />
            </div>
            <div className={cx("action")}>
                {typeL == 0 ? (
                    <Button
                        title="Duyệt"
                        onClick={() =>
                            handlerAllowReq(data.typechange, data.typeReq)
                        }
                    />
                ) : (
                    <Button
                        title="Cập nhật"
                        onClick={() =>
                            handlerUpdateLoc()
                        }
                    />
                )}
                <Button title="Xóa" onClick={() => handlerAllowReq(null, 2)} />
            </div>
        </div>
    );
}

export default ItemLocation;