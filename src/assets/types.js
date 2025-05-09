import L from "leaflet";

const typeLocation = {
    clean: 0,
    dirty: 1,
    recycle: 2
}

const typeReqLocation = {
    add: 0,
    change: 1,
    remove: 2
}

const customIcon = {
    cleanIcon: new L.Icon({
        iconUrl: require('./images/clean.png'),
        iconSize: [25, 35],
        iconAnchor: [12.5, 35],
        popupAnchor: [0, -30]
    }),
    dirtyIcon: new L.Icon({
        iconUrl: require('./images/dirty.png'),
        iconSize: [25, 35],
        iconAnchor: [12.5, 35],
        popupAnchor: [0, -30]
    }),
    recycleIcon: new L.Icon({
        iconUrl: require('./images/recycle.png'),
        iconSize: [25, 35],
        iconAnchor: [12.5, 35],
        popupAnchor: [0, -30]
    }),
    userICon: new L.Icon({
        iconUrl: require('./images/user-location.png'),
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -20]
    }),
    search: new L.Icon({
        iconUrl: require('./images/curSearch.png'),
        iconSize: [30, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20]
    })
}

export { typeLocation, typeReqLocation, customIcon }