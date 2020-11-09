import React from 'react'
import {Line, Bar} from 'react-chartjs-2'
import './Chart.css'

export const Chart = ({ data: { hourly, daily }, option }) => {

  if (option === 'hourly') {
    var opt = hourly
  } else {
    var opt = daily
  }

  const lineChart = (
    daily && hourly ? (
      <Line
        data = {{
          labels: [...Array(opt.length).keys()],
          datasets: [{
            data: option === 'hourly' ? opt.map((i) => i.temp) : opt.map((i) => i.temp.day),
            label: "temperature (°C)",
            borderColor: 'blue',
            fill: true,
            backgroundColor: 'rgb(161, 191, 240)'
          }, {
            data: opt.map((i) => i.humidity),
            label: "humidity (%)",
            borderColor: 'red',
            fill: true,
            backgroundColor: 'rgb(235, 138, 138)',
          }, {
            data: opt.map((i) => i.wind_speed),
            label: "wind speed (m/s)",
            border: 'green',
            fill: true,
            backgroundColor: 'rgb(144, 235, 138)'
          }]
        }}
      />
    ) : null
  )

  return (
    <div className='chartContainer'>
      {lineChart}
    </div>
  )
}
