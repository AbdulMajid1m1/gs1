import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
//   yAxis: [
//     {
//       label: 'rainfall (mm)',
//     },
//   ],
  width: 1000,
  height: 400,
  sx: {
    [`.${axisClasses.left} `]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    Members: 59,
    Admins: 57,
    // newYork: 86,
    // seoul: 21,
    // month: 'Jan',
  },
  {
    Members: 50,
    Admins: 57,
    // paris: 52,
    // newYork: 78,
    // seoul: 28,
    // month: 'Fev',
  },
  {
    Members: 47,
    Admins: 57,
    // paris: 53,
    // newYork: 106,
    // seoul: 41,
    // month: 'Mar',
  },
  {
    Members: 54,
    Admins: 57,
    // paris: 56,
    // newYork: 92,
    // seoul: 73,
    // month: 'Apr',
  },
  {
    Members: 57,
    Admins: 57,
    // paris: 69,
    // newYork: 92,
    // seoul: 99,
    // month: 'May',
  },
  {
    Members: 60,
    Admins: 57,
    // paris: 63,
    // newYork: 103,
    // seoul: 144,
    // month: 'June',
  },
  {
    Members: 59,
    Admins: 57,
    // paris: 60,
    // newYork: 105,
    // seoul: 319,
    // month: 'July',
  },
  {
    Members: 65,
    Admins: 57,
    // paris: 60,
    // newYork: 106,
    // seoul: 249,
    // month: 'Aug',
  },
  {
    Members: 51,
    Admins: 57,
    // paris: 51,
    // newYork: 95,
    // seoul: 131,
    // month: 'Sept',
  },
  {
    Members: 60,
    Admins: 57,
    // paris: 65,
    // newYork: 97,
    // seoul: 55,
    // month: 'Oct',
  },
  {
    Members: 67,
    Admins: 57,
    // paris: 64,
    // newYork: 76,
    // seoul: 48,
    // month: 'Nov',
  },
  {
    Members: 61,
    Admins: 57,
    // paris: 70,
    // newYork: 103,
    // seoul: 25,
    // month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
    //   xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Members', label: 'Members', valueFormatter },
        { dataKey: 'Admins', label: 'Admins', valueFormatter },
        // { dataKey: 'newYork', label: 'New York', valueFormatter },
        // { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
