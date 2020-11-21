import React from 'react'
import {MapCards} from './MapCards'
import MapForm from './MapForm'
import './MapIndex.css'

function MapIndex() {
  return (
    <div className='mapContainer'>
      <h1 className="heading"> Sustainability Features </h1>
      <MapCards className='mapCards'/>
      <h1 className="heading"> Find out More </h1>
      <MapForm className='mapForm'/>
      <br />
    </div>
  )
}

export default MapIndex
