import React, {Component} from 'react'
import {MapCards} from './MapCards'
import MapForm from './MapForm'
import './Map.css'

function MapIndex() {
  return (
    <div className='mapContainer'>
      <h1 className="heading"> Sustainability Features </h1>
      <MapCards className='mapCards'/>
      <br/>
      <MapForm />
      <br />
    </div>
  )
}

export default MapIndex
