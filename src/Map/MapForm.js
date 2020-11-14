import React, {Component} from 'react'
import {WrappedMap} from './Map'
import {MapCards} from './MapCards'
import './Map.css'

class MapForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPark: false,
      isBike: false,
      isBikeLayer: false,
      isTrafficLayer: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const {name, checked} = event.target
    this.setState ({
      [name]: checked
    })
  }

  // https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling#Check_boxes_and_radio_buttons
  render() {
    return (
        <div className='mapContainer'>

          <h1 className="heading"> Sustainability Features </h1>
          <p className="desc"> Sustainability comes in various forms, from maintaining parks
          to biking a bit more often.</p>
          <MapCards className='mapCards'/>
          <br/>

          <h1 className="heading"> Map </h1>
          <form className="form">
            <div className="form-group">
              <span>
              <input
                type="checkbox"
                name="isPark"
                checked={this.state.isPark}
                onClick={this.handleClick}
              /> Metro Parks
              </span>
            </div>

            <br />

            <div className="form-group">
              <span>
              <input
                type="checkbox"
                name="isBike"
                checked={this.state.isBike}
                onClick={this.handleClick}
              /> Bike Lanes
              </span>
            </div>

            <br />

            <div className="form-group">
              <span>
              <input
                type="checkbox"
                name="isBikeLayer"
                checked={this.state.isBikeLayer}
                onClick={this.handleClick}
              /> Bike Lane Layer
              </span>
            </div>

            <br />

              <div className="form-group">
                <span>
                <input
                  type="checkbox"
                  name="isTrafficLayer"
                  checked={this.state.isTrafficLayer}
                  onClick={this.handleClick}
                /> Traffic Layer
                </span>
              </div>
          </form>

        <br />

        <div className="map">
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization,geometry,drawing,places&key=AIzaSyBhxM-oXeYrmPjjRkr5I6HbrH-7gPYU-l0`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            isBike={this.state.isBike}
            isPark={this.state.isPark}
            isBikeLayer={this.state.isBikeLayer}
            isTrafficLayer={this.state.isTrafficLayer}
          />
        </div>
      </div>
    )
  }
}

export default MapForm
