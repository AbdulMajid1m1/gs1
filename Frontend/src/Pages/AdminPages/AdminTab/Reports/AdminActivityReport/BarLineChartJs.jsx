import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const BarLineChartJs = ({ data }) => {
  const chartSetting = {
    yAxis: [
      {
        label: 'Number of Activities',
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
      },
    },
  };

  // Check if data is available and not empty
  const isDataAvailable = data && data.length > 0;

  // Convert the data into the format expected by BarChart
  const dataset = isDataAvailable
    ? data.map(item => ({
      admin: item.name,
      activities: item.count,
    }))
    : [{ admin: '', activities: 0 }]; // Provide a default empty dataset

  return (
    <BarChart
      // width={500}
      height={300}
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'admin' }]}
      series={[
        { dataKey: 'activities', label: 'Activities' },
      ]}
      {...chartSetting}
    />
  );
};

export default BarLineChartJs;
