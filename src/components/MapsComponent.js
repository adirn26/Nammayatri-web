import React, { useRef, useState, useEffect } from "react";
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import markerRetina from "leaflet/dist/images/marker-icon-2x.png"
import axios from 'axios';

const ORS_API_KEY = '5b3ce3597851110001cf62484cb3a69d3fdc40b5b996b04267fda489';

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const customIcon = Leaflet.icon({
    iconUrl: 'https://i.pinimg.com/564x/e6/4b/16/e64b167e83dcd9bdd20c94260393393a.jpg',
    iconSize: [25, 25]
});

const staticone = [
    [
        77.566363,
        13.072563
    ],
    [
        77.56642,
        13.072767
    ],
    [
        77.5665,
        13.073053
    ],
    [
        77.566544,
        13.073209
    ],
    [
        77.566786,
        13.073582
    ],
    [
        77.56686,
        13.073857
    ],
    [
        77.566988,
        13.073847
    ]
]
const MapComponent = (props) => {
    const mapRef = useRef();
    const zoom = 16;
    const { currentLocation, destination, booking } = props;
    const [route, setRoute] = useState(staticone);
    const [flag, setFlag] = useState(true);

    const containerStyle = {
        width: "100%",
        height: "400px"
    }
    const center = {
        lat: currentLocation.lat,
        lng: currentLocation.lon
    }
    const initialMarkers = [
        {
            position: {
                lat: currentLocation.lat,
                lng: currentLocation.lon
            },
            draggable: true
        },
        {
            position: {
                lat: booking.lat,
                lng: booking.lon
            },
            draggable: true
        },
    ];
    // const getRoute = async () => {
    //     const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62484cb3a69d3fdc40b5b996b04267fda489&start=${booking.lon},${booking.lat}&end=${currentLocation.lon},${currentLocation.lat}`);
    //     const routeCoordinates = response.data.features[0].geometry.coordinates;
    //     setRoute(routeCoordinates);
    //     console.log("Route Coordinates: ", routeCoordinates);
    //     console.log("route" + route)
    //     for (var i = 0; i < route.length; i++) {
    //         var temp = route[i][0];
    //         route[i][0] = route[i][1];
    //         route[i][1] = temp;
    //     }
    //     console.log("staticone" + staticone)
    // };

    useEffect(() => {
        axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62484cb3a69d3fdc40b5b996b04267fda489&start=${booking.lon},${booking.lat}&end=${currentLocation.lon},${currentLocation.lat}`)
            .then(response => {
                const routeCoordinates = response.data.features[0].geometry.coordinates;
                // setRoute(routeCoordinates);
                console.log("Route Coordinates: ", routeCoordinates);
                const temp = [];
                if (flag) {
                    setFlag(false);
                    for (var i = 0; i < route.length; i++) {
                       temp.push({
                        lat: route[i][1],
                        lng: route[i][0]
                    }) 
                    }
                    setRoute(temp);
                }
                console.log("route" + route)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [markers, setMarkers] = useState(initialMarkers);

    const mapClicked = async (event) => {
        console.log(event.latlng.lat, event.latlng.lng)
    }

    const markerClicked = (marker, index) => {
        console.log(marker.position.lat, marker.position.lng)
    }

    const markerDragEnd = (event, index) => {
        console.log(event.lat, event.lng)
    }

    console.log(props.currentLocation)

    return (
        <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContent
                onClick={mapClicked}
            />
            {/* {markers.map((marker, index) => (
                <MarkerContent
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onMarkerClick={event => markerClicked(marker, index)}
                    onDragEnd={event => markerDragEnd(event, index)}
                    icon = {customIcon}
                />
            ))} */}
            <Marker position={initialMarkers[1].position} icon={customIcon}>
                <Popup>
                    {booking.name}
                </Popup>
            </Marker>
            <Marker position={initialMarkers[0].position}>
                <Popup>
                    Your Location
                </Popup>
            </Marker>
            {/* <Polyline positions={[initialMarkers[1].position, initialMarkers[0].position]} color="red" weight={3} opacity={0.5} /> */}
            {route && <Polyline positions={route} color="red" weight={3} opacity={0.5} />}
        </MapContainer>
    );
};

const MapContent = ({ onClick }) => {
    const map = useMapEvents({
        click: event => onClick(event)
    })
    return null;
}

const MarkerContent = (props) => {
    const markerRef = useRef();
    const { position, draggable, onMarkerClick, onDragEnd } = props;

    return <Marker
        position={position}
        draggable={draggable}
        eventHandlers={{
            click: event => onMarkerClick(event),
            dragend: () => onDragEnd(markerRef.current.getLatLng())
        }}
        ref={markerRef}
    >
        <Popup>
            <b>{position.lat}, {position.lng}</b>
        </Popup>
    </Marker>
}

export default MapComponent;
