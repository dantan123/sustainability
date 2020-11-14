import React from 'react'
import {Pie} from 'react-chartjs-2'

export const PieChart = () => {
  return (
    <Pie
    data = {{
      datasets: [{
        data: [290, 165],
        backgroundColor: ['rgb(161, 191, 240)', 'rgb(235, 138, 138)']
      }],
      labels: ['Rainy Days', 'Sunny Days']
    }}
    />
  )
}
