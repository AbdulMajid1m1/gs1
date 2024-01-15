import * as React from 'react';
import { LineChart } from '@mui/x-charts';

export default function Dashboardchart() {
    
  return (
    <div className="w-full bg-white mt-5">
      <div className="chart-container max-w-1000 mx-auto">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              color: '#FF693A', 
            },
          ]}
          height={400}
        />
      </div>
    </div>
  );
}
