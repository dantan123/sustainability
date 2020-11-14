import React, {useState} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer"
import { BicyclingLayer, TrafficLayer } from "react-google-maps"
import * as parksData from './data/parks.json'
import * as bikePathData from './data/bikeways.json'
import mapStyles from './data/mapStyles';

function Map(props) {
  const [selectedPark, setSelectedPark] = useState(null)
  var heatMapData = []
  bikePathData.features.map((feature) => {
    const localCoordinates = feature.geometry.coordinates
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
  })

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{lat: 49.282730, lng: -123.120735}} // Vancouver lat and lng
      defaultOptions={{styles: mapStyles}}
    >

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

      {props.isPark && selectedPark ?
        (<InfoWindow
          position = {{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
          onCloseClick = {() => setSelectedPark(null)}
        >
          <div>
            <h1> {selectedPark.properties.name} </h1>
          </div>
        </InfoWindow>)
      : null}

      {props.isBike ? <HeatmapLayer data={heatMapData} /> : null}
      {props.isBikeLayer ? <BicyclingLayer /> : null}
      {props.isTrafficLayer ? <TrafficLayer /> : null}
    </GoogleMap>
  )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))
