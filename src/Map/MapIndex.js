import React from 'react'
import {MapCards} from './MapCards'
import MapForm from './MapForm'
import './Map.css'

function MapIndex() {
  return (
    <div className='mapContainer'>
      <h1 className="heading"> Sustainability Features </h1>
      <MapCards className='mapCards'/>
      <MapForm className='mapForm'/>
      <br />
    </div>
  )
}

export default MapIndex
