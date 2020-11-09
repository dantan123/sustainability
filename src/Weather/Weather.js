import React, {Component} from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import {fetchData} from './WAPI'
import {Chart} from './WChart'
import './Weather.css'

class Weather extends Component {
  state = {
    data: {},
    option: 'hourly'
  }

  async componentDidMount() {
    const data = await fetchData()
    this.setState({
      data: data
    })
  }

  handleChange = (event) => {
    this.setState ({
      option: event.target.value
    })
  }

  render() {
    const {data, option} = this.state
    return (
      <div className="weatherContainer">
        <h1 className="weatherHeading"> Vancouver Weather Forecast </h1>
        <FormControl className="formPicker">
          <NativeSelect defaultValue="" onChange = {this.handleChange}>
            <option value="hourly"> Hourly (48 hrs) </option>
            <option value="daily"> Daily (7 days) </option>
          </NativeSelect>
        </FormControl>
        <Chart data={data} option={option}/>
      </div>
    )
  }
}

export default Weather
