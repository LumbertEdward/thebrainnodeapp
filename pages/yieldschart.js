import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
  datasets: [{
    label: 'maize',
    data:[60, 40,50, 70,35,15],
    backgroundColor: [

      'rgba(36, 148, 36,0.05)'
      
    ],
    borderColor: [
     
      'rgba(36, 148, 36,1)'
     
    ],
    tension: 0.2,
    pointBorderColor:  'rgba(36, 148, 36, 1)',
    pointBackgroundColor: 'rgb(255,255,255)',
    pointRadius:'4',
    fill:true,
    borderWidth: 0.5
  },
  {
    label: 'Beans',
    data: [65, 78, 66, 44, 56, 67, 75],
    backgroundColor: [

      'rgba(255, 0, 0, 0.05)'
      
    ],
    borderColor: [
     
      'rgba(255, 0, 0, 1)'
     
    ],
    borderWidth: 0.5, 
    tension: 0.2,
    pointBorderColor:  'rgba(255, 0, 0, 1)',
    pointBackgroundColor: 'rgb(255,255,255)',
    pointRadius: '4',
    fill:true
  }
]
}

export default function Yields(){
    return (
      <div>
          <p>Yields Analysis</p>
        <Line
          data={data}
          height={200}
        />
      </div>
    );
  }
