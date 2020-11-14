import React, {Component} from 'react'
import {MapCards} from './MapCards'
import MapForm from './MapForm'
import './Map.css'

function MapIndex() {
  return (
    <div className='mapContainer'>
      <h1 className="heading"> Sustainability Features </h1>
      <p className="desc"> Sustainability comes in various forms, from maintaining parks
      to biking a bit more often.</p>
      <MapCards className='mapCards'/>
      <br/>
      <h1 className="heading"> Vancouver Map </h1>
      <MapForm />
      <br />
    </div>
  )
}

export default MapIndex
