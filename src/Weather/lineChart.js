import React from 'react'
import {Line} from 'react-chartjs-2'

export const LineChart = ({ data: { hourly, daily, current }, option }) => {
  if (option === 'hourly') {
    var opt = hourly;
  } else {
    var opt = daily;
  }

  if (daily && hourly) {
    return (
      <Line
        data = {{
          labels: [...Array(opt.length).keys()],
          datasets: [{
            data: option === 'hourly' ? opt.map((i) => i.temp) : opt.map((i) => i.temp.day),
            label: "Temperature (°C)",
            borderColor: 'blue',
            fill: true,
            backgroundColor: 'rgb(161, 191, 240)'
          }, {
            data: opt.map((i) => i.humidity),
            label: "Humidity (%)",
            borderColor: 'red',
            fill: true,
            backgroundColor: 'rgb(235, 138, 138)',
          }, {
            data: opt.map((i) => i.wind_speed),
            label: "Wind Speed (m/s)",
            border: 'green',
            fill: true,
            backgroundColor: 'rgb(144, 235, 138)'
          }]
        }}
      />
    )
  } else {
    return null;
  }
}
