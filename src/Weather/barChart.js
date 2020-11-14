import React from 'react'
import {Bar} from 'react-chartjs-2'

export const BarChart = () => {
  return (
    <Bar
      data = {{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: [7, 8, 10, 13, 17, 20, 22, 22, 19, 14, 9, 7],
          backgroundColor: 'rgb(161, 191, 240)',
          label: 'High Temp'
        },{
          data: [3, 3, 4, 6, 10, 12, 14, 14, 14, 12, 8, 5, 3],
          backgroundColor: 'rgb(235, 138, 138)',
          label: 'Low Temp'
        }]
      }}
    />
  )
}
