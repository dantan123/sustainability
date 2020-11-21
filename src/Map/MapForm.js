import React, {Component} from 'react'
import {LabelledMap} from './Map'
import './MapForm.css'

class MapForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPark: true,
      isBike: true,
      isMuseum: true,
      isSubway: true,
      isBikeLayer: true,
      isTrafficLayer: true,
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
      <div>
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
              name="isMuseum"
              checked={this.state.isMuseum}
              onClick={this.handleClick}
            /> Museums
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
              name="isSubway"
              checked={this.state.isSubway}
              onClick={this.handleClick}
            /> Subway Stations
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
        <div className="map">
          <LabelledMap
            isBike={this.state.isBike}
            isPark={this.state.isPark}
            isMuseum={this.state.isMuseum}
            isSubway={this.state.isSubway}
            isBikeLayer={this.state.isBikeLayer}
            isTrafficLayer={this.state.isTrafficLayer}
          />
        </div>
      </div>
    )
  }
}

export default MapForm;
