import React, {Component} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import {fetchData} from './WAPI';
import {LineChart} from './lineChart';
import {BarChart} from './barChart';
import {PieChart} from './pieChart';
import {WeatherCards} from './weatherCards';
import './Weather.css';

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
      <div className='page'>
        <h1 className="weatherHeading"> Vancouver Weather </h1>
        <WeatherCards data={data}/>

        <div className="weatherContainer">
          <div className='weatherForecast'>
            <h2 className = 'chartHeading'> Current Weather Forecast </h2>
            <FormControl className="formPicker">
              <NativeSelect defaultValue="" onChange = {this.handleChange}>
                <option value="hourly"> Hourly (48 hrs) </option>
                <option value="daily"> Daily (7 days) </option>
              </NativeSelect>
            </FormControl>
            <LineChart data={data} option={option} />
          </div>

          <div className='annualWeather'>
            <h2 className='chartHeading'> Average Annual Weather </h2>
            <BarChart />
          </div>

          <div className='weatherDistribution'>
            <PieChart />
          </div>
        </div>

      </div>
    )
  }
}

export default Weather
