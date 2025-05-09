import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Button from "../../Button";
import { typeLocation, typeReqLocation, customIcon } from "../../../assets/types";
import classNames from "classnames/bind";

import styles from "./CustomAction.module.scss"

const cx = classNames.bind(styles)

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
                setLocations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) return <p>Loading locations...</p>;
    if (error) return <p>Error loading locations: {error}</p>;

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

    const handlerUpdate = async (loc, typeChange, typeReq) => {
        try {
            const putResponse = await fetch(
                `https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations/${loc.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lat: loc.lat,
                        lng: loc.lng,
                        typechange: typeChange,
                        typeReq: typeReq
                    }),
                }
            );

            if (!putResponse.ok) {
                throw new Error("PUT request failed");
            }

            const updatedData = await putResponse.json();
            alert("Yều cầu của bạn đã được nhận.")
            return updatedData;
        } catch (putError) {

            try {
                const postResponse = await fetch(
                    "https://680db89fc47cb8074d9106d1.mockapi.io/ReqAddLocations",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idLocation: loc.id,
                            lat: loc.lat,
                            lng: loc.lng,
                            typechange: typeChange,
                            typeReq: typeReq
                        }),
                    }
                );
                alert("Yều cầu của bạn đã được nhận.")

                if (!postResponse.ok) {
                    throw new Error("POST request also failed");
                }
            } catch (postError) {
                console.error("Cả PUT và POST đều thất bại:", postError);
            }
        }
    };
    
    return (
        <>
            {nearbyLocations.map((loc) => (
                <Marker
                    key={loc.id}
                    position={[parseFloat(loc.lat), parseFloat(loc.lng)]}
                    icon={
                        loc.type == 0 ? customIcon.cleanIcon : loc.type == 1 ? customIcon.dirtyIcon : customIcon.recycleIcon
                    }
                >
                    <Popup>
                        <div className={cx('desc-location')}>
                            <br />
                            {loc.desc || "No description available"}
                            <br />
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}&travelmode=driving`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Đường đi trên google map
                            </a>
                            {
                                loc.type == 0 ? (<Button
                                    onClick={() => handlerUpdate(loc, typeLocation.dirty, typeReqLocation.change)}
                                    title="Điểm lại bẩn"
                                />) : loc.type == 1 ? (<Button
                                    onClick={() => handlerUpdate(loc, typeLocation.clean, typeReqLocation.change)}
                                    title="Điểm đã sạch"
                                />) : (<Button
                                    onClick={() => handlerUpdate(loc, typeLocation.recycle, typeReqLocation.remove)}
                                    title="Điểm bị dỡ"
                                />)
                            }
                            
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default MarkersFromAPI;
