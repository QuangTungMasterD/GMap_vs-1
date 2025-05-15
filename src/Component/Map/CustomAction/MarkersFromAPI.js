import { useContext, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Button from "../../Button";
import { typeLocation, typeReqLocation, customIcon } from "../../../assets/types";
import classNames from "classnames/bind";
import { database } from "../../../untils/fileBaseConfig";
import { ref, onValue, push, set } from "firebase/database";

import styles from "./CustomAction.module.scss";
import { ToastContext } from "../../../contexts/ToastProvider/ToastProvider";

const cx = classNames.bind(styles);

const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

function MarkersFromAPI({ searchLocation }) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        const locationsRef = ref(database, "locations");

        const unsubscribe = onValue(
            locationsRef,
            (snapshot) => {
                try {
                    const data = snapshot.val();
                    if (data) {
                        const locationsArray = Object.keys(data)
                            .map((key) => ({
                                id: key,
                                ...data[key],
                            }))
                            .filter(item => item.lat && item.lng && item.type !== undefined);
                        setLocations(locationsArray);
                    } else {
                        setLocations([]);
                    }
                    setLoading(false);
                } catch (err) {
                    setError("Lỗi khi lấy dữ liệu từ Firebase");
                    setLoading(false);
                }
            },
            (err) => {
                setError("Lỗi kết nối Firebase: " + err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Đang tải vị trí...</p>;
    if (error) return <p>Lỗi khi tải vị trí: {error}</p>;

    const nearbyLocations = searchLocation
        ? locations.filter((location) => {
              const distance = getDistance(
                  searchLocation[0],
                  searchLocation[1],
                  parseFloat(location.lat),
                  parseFloat(location.lng)
              );
              return distance <= 200;
          })
        : [];

    const handlerUpdate = async (desc, loc, typeChange, typeReq) => {
        toast.warning("Yêu cầu đang được gửi đi");

        try {
            const reqLocationsRef = ref(database, "reqAddLocations");
            const newRequestRef = push(reqLocationsRef);
            await set(newRequestRef, {
                id: newRequestRef.key,
                idLocation: loc.id,
                lat: loc.lat,
                lng: loc.lng,
                typechange: typeChange,
                typeReq: typeReq,
                desc: desc || "",
            });

            toast.success("Yêu cầu đã được gửi lên reqAddLocations");
        } catch (error) {
            toast.error("Yêu cầu gửi bị lỗi");
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    return (
        <>
            {nearbyLocations.map((loc) => (
                <Marker
                    key={loc.id}
                    position={[parseFloat(loc.lat), parseFloat(loc.lng)]}
                    icon={
                        loc.type == 0
                            ? customIcon.cleanIcon
                            : loc.type == 1
                            ? customIcon.dirtyIcon
                            : customIcon.recycleIcon
                    }
                >
                    <Popup>
                        <div className={cx("desc-location")}>
                            <br />
                            {loc.desc || "Không có mô tả"}
                            <br />
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}&travelmode=driving`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Đường đi trên Google Map
                            </a>
                            {loc.type == 0 ? (
                                <Button
                                    onClick={() =>
                                        handlerUpdate(
                                            loc.desc,
                                            loc,
                                            typeLocation.dirty,
                                            typeReqLocation.change
                                        )
                                    }
                                    title="Điểm lại bẩn"
                                />
                            ) : loc.type == 1 ? (
                                <Button
                                    onClick={() =>
                                        handlerUpdate(
                                            loc.desc,
                                            loc,
                                            typeLocation.clean,
                                            typeReqLocation.change
                                        )
                                    }
                                    title="Điểm đã sạch"
                                />
                            ) : (
                                <Button
                                    onClick={() =>
                                        handlerUpdate(
                                            loc.desc,
                                            loc,
                                            typeLocation.recycle,
                                            typeReqLocation.remove
                                        )
                                    }
                                    title="Điểm bị dỡ"
                                />
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default MarkersFromAPI;