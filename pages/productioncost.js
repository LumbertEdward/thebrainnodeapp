import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Seed',
		'Chemicals',
		'Equipment',
        'Energy'
	],
	datasets: [{
		data: [300, 50, 100, 40],
		backgroundColor: [
		'rgba(255,0,0,0.5)',
		'rgba(36, 148, 36,0.5)',
		'#F9F9F9',
        'rgba(30, 153, 230, 0.5)'
		],
		hoverBackgroundColor: [
            '#rgba(255,0,0,0.5)',
            'rgba(36, 148, 36,0.5)',
            '#F9F9F9',
            'rgba(30, 153, 230, 0.5)'
		]
	}],
	circumference:'10'
};

export default function Production(){
    return(
	<div>
		<Pie
			data={data}
			width={400}
			height={400}
			
		/>
	</div>  
);
}