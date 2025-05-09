import classNames from "classnames/bind";

import styles from "./ListLocation.module.scss";
import { typeLocation, typeReqLocation } from "../../../assets/types";
import Button from "../../../Component/Button";
import { useState } from "react";

const cx = classNames.bind(styles);

function ItemLocation({ data, onRemove, typeL }) {
    const [desc, setDesc] = useState(data.desc ? data.desc : '');

    const handlerAllowReq = async (type, typeReq) => {
        let isNext = window.confirm("Bạn có chắc chắn tiếp tục?");
        if (typeL == 0) {
            if (!isNext) return;
            if (typeReq == 1) {
                const response = await fetch(
                    `https://680db89fc47cb8074d9106d1.mockapi.io/Locations/${data.idLocation}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            type: type,
                            lat: data.lat,
                            lng: data.lng,
                            desc: desc
                        }),
                    }
                );
                await fetch(
                    `https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations/${data.id}`,
                    {
                        method: "DELETE",
                    }
                );
                onRemove(data.id);
            } else if (typeReq == 0) {
                const response = await fetch(
                    `https://680db89fc47cb8074d9106d1.mockapi.io/Locations`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            type: type,
                            lat: data.lat,
                            lng: data.lng,
                            desc: desc
                        }),
                    }
                );
                await fetch(
                    `https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations/${data.id}`,
                    {
                        method: "DELETE",
                    }
                );
                onRemove(data.id);
            } else if (typeReq === 2) {
                await fetch(
                    `https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations/${data.id}`,
                    {
                        method: "DELETE",
                    }
                );

                if(type == 2) {
                    await fetch(
                        `https://680db89fc47cb8074d9106d1.mockapi.io/Locations/${data.idLocation}`,
                        {
                            method: "DELETE",
                        }
                    );
                }
                onRemove(data.id);
            } else {
                alert("Lỗi");
            }
            
        }
        else if(typeL == 1) {
            await fetch(
                `https://680db89fc47cb8074d9106d1.mockapi.io/Locations/${data.id}`,
                {
                    method: "DELETE",
                }
            );
            onRemove(data.id);
        }
    };

    const handlerUpdateLoc = async () => {
        let isNext = window.confirm("Bạn có chắc chắn tiếp tục?");
        await fetch(
            `https://680db89fc47cb8074d9106d1.mockapi.io/Locations/${data.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: data.type,
                    lat: data.lat,
                    lng: data.lng,
                    desc: desc
                }),
            }
        );
        alert("Đã cập nhật.")
    }

    const handlerDesc = (e) => {
        setDesc(e.target.value)
    }

    return (
        <div className={cx("item-req")}>
            <div className={cx("item-location")}>
                <p className={cx("location-lat")}>lat: {data.lat}</p>
                <p className={cx("location-lng")}>lng: {data.lng}</p>
            </div>
            <div className={cx("gg-map")}>
                <a
                    target="_blank"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`} rel="noreferrer"
                >
                    xem trên ggmap
                </a>
            </div>
            {typeL == 0 ? (<div className={cx("item-type")}>
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
            </div>) : <></>}
            <div className={cx('desc')}>
                <input placeholder="Nhập gì đó :))" value={desc} onChange={(e) => handlerDesc(e)} className={cx('input-desc')} />
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
                            handlerUpdateLoc(1)
                        }
                    />
                )}
                <Button title="Xóa" onClick={() => handlerAllowReq(null, 2)} />
            </div>
        </div>
    );
}

export default ItemLocation;
