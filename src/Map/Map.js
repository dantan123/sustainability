import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  HeatmapLayer,
  BicyclingLayer,
  TrafficLayer
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import {formatRelative} from 'date-fns'
// for testing: import * as parksData from './data/parks.json'
import * as bikePathData from './data/bikeways.json'
import mapStyles from './data/mapStyles';
import axios from 'axios';

const libraries = ["places", "visualization"];
const mapContainerStyle = {
  width: '72vw',
  height: '72vh'
};
const center = {lat: 49.282730, lng: -123.120735};
const options = {styles: mapStyles, disableDefaultUI: true};

export const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [parkData, setParkData] = useState([]);

  var url =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.282730,-123.120735&radius=10000&type=park&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

  const getParks = async () => {
    const {data: {results}} = await axios.get(url);
    setParkData(results);
  };

  useEffect(() => {
    getParks();
  }, [])

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

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(15);
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  let heatMapData = []
  bikePathData.features.map((feature) => {
    const localCoordinates = feature.geometry.coordinates;
    for (var i = 0; i < localCoordinates.length; i++) {
      // massaging the data given that the input data have inconsistent array shapes
      if (localCoordinates[i][0].length === 2 || localCoordinates[i][1].length === 2) {
        heatMapData.push(new window.google.maps.LatLng(localCoordinates[i][0][1], localCoordinates[i][0][0]))
        heatMapData.push(new window.google.maps.LatLng(localCoordinates[i][1][1], localCoordinates[i][1][0]))
      } else {
        heatMapData.push(new window.google.maps.LatLng(localCoordinates[i][1], localCoordinates[i][0]))
      }
    }
  });

  return (
    <div>
      <Search panTo={panTo}/>
      <GoogleMap
        className='map'
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center} // Vancouver lat and lng
        options={options}
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

        {props.isPark ?
          parkData.map((park) => (
            <Marker
              key = {park.place_id}
              position = {{
                lat: park.geometry.location.lat,
                lng: park.geometry.location.lng
              }}
              onClick={() => setSelectedPark(park)}
              icon={{
                url: '/park.svg',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))
        : null}

        {selectedPark && props.isPark ? (
          <InfoWindow
            position = {{
              lat: selectedPark.geometry.location.lat,
              lng: selectedPark.geometry.location.lng
            }}
            onCloseClick = {() => setSelectedPark(null)}
          >
            <div>
              <h1> {selectedPark.name} </h1>
              <p> Address: {selectedPark.vicinity} </p>
              <p> Rating: {selectedPark.rating} </p>
              <p> {selectedPark.opening_hours &&
                selectedPark.opening_hours.open_now ? '': 'Not'} open </p>
            </div>
          </InfoWindow>
        ): null}

        {props.isBike ? <HeatmapLayer data={heatMapData} /> : null}
        {props.isBikeLayer ? <BicyclingLayer /> : null}
        {props.isTrafficLayer ? <TrafficLayer /> : null}
      </GoogleMap>
    </div>
  )
}

function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => 49.282730, lng: () => -123.120735},
      radius: 200 * 1000,
    }
  })

  return (
    <div className='search'>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({address});
            const {lat, lng} = await getLatLng(results[0]);
            panTo({lat, lng});
          } catch(error) {
            console.log(error);
          }
        }}
      >

        <ComboboxInput
          value={value}
          onChange={(e) => {setValue(e.target.value)}}
          disabled={!ready}
          placeholder="Find out more about the metro park"
        >
        </ComboboxInput>
        <ComboboxPopover portal={false}>
          <ComboboxList>
          {status === 'OK' &&
            data.map(({id, description}) => (
              <ComboboxOption key={id} value={description} className='option'/>
          ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
