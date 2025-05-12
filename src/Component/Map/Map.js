import classNames from "classnames/bind";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import styles from "./Map.module.scss";
import { useState, useEffect, useRef } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import Button from "../Button";
import L from "leaflet";
import MarkersFromAPI from "./CustomAction/MarkersFromAPI";
import LayerAddMarker from "./CustomAction/LayerAddMarker";

import { customIcon } from "../../assets/types";

const cx = classNames.bind(styles);

const typeMap = [
    {
        image: require('../../assets/images/type-map-0.png'),
        attri: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
        image: require('../../assets/images/type-map-1.png'),
        attri: "Map tiles &copy; Esri — Source: Esri, DeLorme, NAVTEQ",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    },
    {
        image: require('../../assets/images/type-map-2.png'),
        attri: "Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, and the GIS User Community",
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    },
];

function Map() {
    // const [UserPosition, setUserPosition] = useState(
    //     sessionStorage.getItem("UserPosition") != null
    //         ? [
    //               +sessionStorage.getItem("UserPosition").split(",")[0],
    //               +sessionStorage.getItem("UserPosition").split(",")[1],
    //           ]
    //         : [20, 20]
    // );
    const UserPosition = useRef(
        sessionStorage.getItem("UserPosition") != null
            ? [
                  +sessionStorage.getItem("UserPosition").split(",")[0],
                  +sessionStorage.getItem("UserPosition").split(",")[1],
              ]
            : [20, 20]
    );
    const [localFound, setLocalFound] = useState(false);

    const [sPosition, setSPosition] = useState(
        sessionStorage.getItem("sPosition") != null
            ? [
                  +sessionStorage.getItem("sPosition").split(",")[0],
                  +sessionStorage.getItem("sPosition").split(",")[1],
                  `${sessionStorage.getItem("sPosition").split(",")[2]}, ${
                      sessionStorage.getItem("sPosition").split(",")[3]
                  }`,
              ]
            : null
    );

    const [zoom, setZoom] = useState(
        sessionStorage.getItem("zoom") != null
            ? +sessionStorage.getItem("zoom")
            : 14
    );
    const [center, setCenter] = useState(
        sessionStorage.getItem("center") != null
            ? [
                  +sessionStorage.getItem("center").split(",")[0],
                  +sessionStorage.getItem("center").split(",")[1],
              ]
            : sessionStorage.getItem("UserPosition") != null
            ? [
                  +sessionStorage.getItem("UserPosition").split(",")[0],
                  +sessionStorage.getItem("UserPosition").split(",")[1],
              ]
            : [20, 20]
    );
    const [iTypeMap, setITypeMap] = useState(
        sessionStorage.getItem("iTypeMap") ? Number(sessionStorage.getItem("iTypeMap")) : typeMap.length - 1
    )

    const [type, setType] = useState(1)

    const mapRef = useRef(null);
    const tgAddPlus = useRef(null);
    const currentSearchMarkerRef = useRef(null);

    const handlerLocation = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(UserPosition.current, zoom);
        }
    };

    const handlerAddMarker = () => {
        const controlMap = document.querySelector(".leaflet-control-container");
        controlMap.style.display =
            controlMap.style.display === "block" ||
            controlMap.style.display === ""
                ? "none"
                : "block";
        tgAddPlus.current.style.display =
            controlMap.style.display === "block" ? "none" : "flex";
    };

    function MapEvents() {
        const map = useMapEvents({
            locationfound(e) {
                const newPosition = [e.latlng.lat, e.latlng.lng];
                UserPosition.current = newPosition;
                sessionStorage.setItem("UserPosition", newPosition.join(","));
                setZoom(14);
                if (!localFound) {
                    map.flyTo(e.latlng, zoom);
                    setLocalFound(true);
                }
            },

            moveend() {
                const curCenter = map.getCenter();
                const pos = [curCenter.lat, curCenter.lng];
                setCenter(pos);
                setZoom(map.getZoom());
                sessionStorage.setItem("center", pos.join(","));
                sessionStorage.setItem("zoom", map.getZoom());
            },
        });

        useEffect(() => {
            if (map) {
                map.locate({
                    watch: true,
                    enableHighAccuracy: true,
                });
                // map.locate({ setView: false, enableHighAccuracy: true });
                
                const markerCur = L.marker(UserPosition.current, {
                    icon: customIcon.userICon
                })
                .addTo(mapRef.current)
                .bindPopup(
                    "Vị trí của bạn"
                );
                
                return () => {
                    map.locate();
                    if(mapRef.current !== null) {
                        mapRef.current.removeLayer(markerCur)
                    }
                };
            }
        }, [map]);

        useEffect(() => {
            if (map) {
                const geocoder = L.Control.geocoder({ position: "topleft", defaultMarkGeocode: false }).addTo(map);
                geocoder.on("markgeocode", function (e) {
                    const latLng = e.geocode.center;
        
                    if (currentSearchMarkerRef.current && mapRef.current.hasLayer(currentSearchMarkerRef.current)) {
                        mapRef.current.removeLayer(currentSearchMarkerRef.current);
                    }
        
                    const newMarker = L.marker(latLng, {
                        icon: customIcon.search,
                    })
                        .addTo(mapRef.current)
                        .bindPopup("<b>Địa chỉ:</b> " + e.geocode.name)
                        .openPopup();
        
                    currentSearchMarkerRef.current = newMarker;
        
                    mapRef.current.setView(latLng, 10);
                    setSPosition([latLng.lat, latLng.lng, e.geocode.name]);
                    sessionStorage.setItem(
                        "sPosition",
                        [latLng.lat, latLng.lng, e.geocode.name].join(",")
                    );
                });
        
                return () => {
                    map.removeControl(geocoder);
                    if (currentSearchMarkerRef.current && mapRef.current?.hasLayer(currentSearchMarkerRef.current)) {
                        mapRef.current.removeLayer(currentSearchMarkerRef.current);
                    }
                };
            }
        }, [map]);

        useEffect(() => {
            if (!mapRef.current || !sPosition) return;
        
            const [lat, lng, title] = sPosition;
        
            // if (
            //     UserPosition.current &&
            //     lat ==== UserPosition.current[0] &&
            //     lng ==== UserPosition.current[1]
            // ) {
            //     return;
            // }
        
            const markerCur = L.marker([lat, lng], {
                icon: customIcon.search,
            })
                .addTo(mapRef.current)
                .bindPopup("<b>Địa chỉ:</b> " + title);
        
            return () => {
                if (mapRef.current && mapRef.current.hasLayer(markerCur)) {
                    mapRef.current.removeLayer(markerCur);
                }
            };
        });

        return null;
    }

    const handlerChangeTypeMap = () => {
        let nextType = iTypeMap + 1
        if(nextType > typeMap.length - 1) nextType = 0;
        setITypeMap(nextType)
        sessionStorage.setItem("iTypeMap", nextType)
    }

    return (
        <div className={cx("wrapper")}>
            <MapContainer
                ref={mapRef}
                center={center}
                className={cx("map")}
                zoom={zoom}
                minZoom={2.5}
                attributionControl={false}
                keyboard={true}
            >
                <LayerAddMarker
                    center={center}
                    refs={tgAddPlus}
                    classes={cx("plus-icon")}
                    type={type}
                />
                <TileLayer attribution={typeMap[iTypeMap].attri} url={typeMap[iTypeMap].url} />
                {/* <Marker position={UserPosition} /> */}
                <MarkersFromAPI searchLocation={sPosition} />
                <MarkersFromAPI searchLocation={UserPosition.current} />
                <div className={cx("cus-btn-top-right")}>
                    <MapEvents />
                    <Button
                        onClick={handlerLocation}
                        className={cx("btn-cus-map")}
                        title="Vị trí của bạn"
                    />
                    <Button
                        onClick={() => {
                            setType(1)
                            handlerAddMarker()
                        }}
                        className={cx("btn-cus-map")}
                        title="Thêm điểm rác"
                    />
                    <Button
                        onClick={() => {
                            setType(2)
                            handlerAddMarker()
                        }}
                        className={cx("btn-cus-map")}
                        isPrimary
                        title="Thêm điểm tái chế"
                    />
                    {/* <select onChange={(e) => handlerChangeTypeMap(e)}>
                        {
                            typeMap.map((item, i) => {
                                return <option key={i} value={JSON.stringify({ url: item.url, att: item.attri })}>{item.icon}</option>
                            })
                        }
                    </select> */}
                </div>
                <div className={cx("cus-btn-bottom-left")}>
                    <Button style={{ backgroundImage: `url(${typeMap[iTypeMap + 1 > typeMap.length - 1 ? 0 : iTypeMap + 1].image})` }} onClick={() => handlerChangeTypeMap()} className={cx('btn-cus-map', 'type-map')} />
                </div>
            </MapContainer>
        </div>
    );
}

export default Map;
