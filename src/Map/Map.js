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

export const LabelledMap = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const types = ['park', 'museum', 'subway_station'];
  //const [allData, setAllData] = useState(new Map());
  const [selected, setSelected] = useState(null);
  const [parkData, setParkData] = useState([]);
  const [museumData, setMuseumData] = useState([]);
  const [subwayData, setSubwayData] = useState([]);
  const [markers, setMarkers] = useState([]);

  const updateData = (key, value) => {
    //setAllData(prev => new Map(
      //[...prev, [key, value]]
    //))
    if (key === 'park') {
      setParkData(value);
    } else if (key === 'museum') {
      setMuseumData(value);
    } else if (key === 'subway_station') {
      setSubwayData(value);
    }
  }

  const getData = async (types) => {
    for (const type of types) {
      var url =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.282730,-123.120735&radius=10000&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      const {data: {results}} = await axios.get(url);
      updateData(type, results);
    }
    // console.log(allData);
  };

  useEffect(() => {
    getData(types);
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

  let heatMapData = [];
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

        {parkData && props.isPark ?
          parkData.map((place) => (
            <Marker
              key = {place.place_id}
              position = {{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
              }}
              onClick={() => setSelected(place)}
              icon={{
                url: '/park.svg',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))
        : null }

        {museumData && props.isMuseum ?
          museumData.map((place) => (
            <Marker
              key = {place.place_id}
              position = {{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
              }}
              onClick={() => setSelected(place)}
              icon={{
                url: '/museum.svg',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))
        : null }

        {subwayData && props.isSubway ?
          subwayData.map((place) => (
            <Marker
              key = {place.place_id}
              position = {{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
              }}
              onClick={() => setSelected(place)}
              icon={{
                url: '/subway.svg',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))
        : null }

        {selected ? (
          <InfoWindow
            position = {{
              lat: selected.geometry.location.lat,
              lng: selected.geometry.location.lng
            }}
            onCloseClick = {() => setSelected(null)}
          >
            <div>
              <h1> {selected.name} </h1>
              <p> Address: {selected.vicinity} </p>
              <p> Rating: {selected.rating} </p>
              <p> {selected.opening_hours &&
                selected.opening_hours.open_now ? '': 'Not'} open </p>
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
          placeholder="Find a place"
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
