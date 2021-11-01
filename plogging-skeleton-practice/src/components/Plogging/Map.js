import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPosition } from '../../slices/ploggingSlice'
import { selectCurrentPosition } from '../../slices/ploggingSlice'
import * as Location from 'expo-location';


const Map = () => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const currentPosition = useSelector(selectCurrentPosition); 

    const [errorMsg, setErrorMsg] = useState(null);    

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status)
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
    
            let location = await Location.getLastKnownPositionAsync({});
            console.log(location)
            dispatch(setCurrentPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: currentPosition.latitudeDelta,
                longitudeDelta: currentPosition.longitudeDelta,
            }));
        })();
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (currentPosition) {
        text = JSON.stringify(currentPosition);
        console.log('[LOG] current location : ' + currentPosition);
    }


    useEffect(() => {
        if(!currentPosition) return;

        mapRef.current.fitToSuppliedMarkers(["currentPosition"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50},
        });

    }, [currentPosition])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: currentPosition?.latitude,
                longitude: currentPosition?.longitude,
                latitudeDelta: currentPosition.latitudeDelta,
                longitudeDelta: currentPosition.longitudeDelta,
            }}
        >
            {currentPosition?.latitude && currentPosition?.longitude && (<Marker
                coordinate={{
                    latitude: currentPosition?.latitude,
                    longitude: currentPosition?.longitude,
                }}
                title="currentPosition"
                description={"current position"}
                identifier="currentPosition"
            />)}
        </MapView>
    );
};

export default Map

const styles = StyleSheet.create({})
