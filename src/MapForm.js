import React, {Component} from 'react'
import {WrappedMap} from './Map'
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
      <div className='sus-map'>
        <h1 className="heading"> Vancouver Sustainability Map </h1>
          <form>
            <div className="form">

            <div className="form-group">
              <span>
              <input
                type="checkbox"
                name="isPark"
                checked={this.state.isPark}
                onClick={this.handleClick}
              /> All Metro Parks
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
              /> Bike Lane Heat Map
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

            </div>
          </form>

        <br />

        <div className="map-style">
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
