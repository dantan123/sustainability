import React, {useState, useRef, useCallback} from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  HeatmapLayer,
  BicyclingLayer,
  TrafficLayer
} from '@react-google-maps/api';
import {formatRelative} from 'date-fns'
import * as parksData from './data/parks.json'
import * as bikePathData from './data/bikeways.json'
import mapStyles from './data/mapStyles';

const libraries = ["places", "visualization"];
const mapContainerStyle = {
  width: '72vw',
  height: '72vh'
};

export const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      }
    ])
  }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  let heatMapData = []
  bikePathData.features.map((feature) => {
    const localCoordinates = feature.geometry.coordinates;
    for (var i = 0; i < localCoordinates.length; i++) {
      // massaging the data; the input data have inconsistent array shapes
      if (localCoordinates[i][0].length === 2 || localCoordinates[i][1].length === 2) {
        heatMapData.push(new window.google.maps.LatLng(localCoordinates[i][0][1], localCoordinates[i][0][0]))
        heatMapData.push(new window.google.maps.LatLng(localCoordinates[i][1][1], localCoordinates[i][1][0]))
      }
      else {
        heatMapData.push(new window.google.maps.LatLng(localCoordinates[i][1], localCoordinates[i][0]))
      }
    }
  });

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={{lat: 49.282730, lng: -123.120735}} // Vancouver lat and lng
      options={{styles: mapStyles}}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map(marker => (
        <Marker
          key={marker.time.toISOString()}
          position={{lat: marker.lat, lng: marker.lng}}
          icon={{
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15)
          }}
          onClick={() => {setSelected(marker)}}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{lat: selected.lat, lng: selected.lng}}
          onCloseClick={() => {setSelected(null)}}
        >
          <div>
            <h2> New Location </h2>
            <p> selected @ {formatRelative(selected.time, new Date())} </p>
          </div>
        </InfoWindow>
      ) : null }

      {props.isPark ?
        parksData.features.map(park => (
          <Marker
            key = {park.parkid}
            position = {{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0]
            }}
            onClick={() => setSelectedPark(park)}
            icon={{
              url: '/park.svg',
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))
      : null}

      {props.isPark && selectedPark ? (
        <InfoWindow
          position = {{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
          onCloseClick = {() => setSelectedPark(null)}
        >
          <div>
            <h1> {selectedPark.properties.name} </h1>
          </div>
        </InfoWindow>
      ): null}

      {props.isBike ? <HeatmapLayer data={heatMapData} /> : null}
      {props.isBikeLayer ? <BicyclingLayer /> : null}
      {props.isTrafficLayer ? <TrafficLayer /> : null}
    </GoogleMap>
  )
}
