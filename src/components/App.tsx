import * as React from 'react';
// import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const App = ({ stats: { preInit, layerTime } }: any) => {
  // const [init, setInit] = useState([]);

  const options = {
    title: {
      text: 'Time per layer',
    },
    series: [
      {
        data: layerTime?.map((v: Array<any>) => Number(v[1])) || [],
      },
    ],
  };

  const options2 = {
    title: {
      text: 'v1 and v2',
    },
    chart: {
      type: 'spline',
    },
    series: [
      {
        name: 'val1',
        data: layerTime?.map((v: Array<any>) => Number(v[1])) || [],
      },
      {
        name: 'val2',
        data: layerTime?.map((v: Array<any>) => Number(v[2])) || [],
      },
    ],
  };

  const options3 = {
    title: {
      text: 'v3',
    },
    series: [
      {
        name: 'val3',
        data: layerTime?.map((v: Array<any>) => Number(v[3])) || [],
      },
    ],
  };

  return (
    <div>
      <details>
        <summary>Time per layer</summary>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </details>

      <details open>
        <summary>v1 and v2</summary>
        <HighchartsReact highcharts={Highcharts} options={options2} />
      </details>

      <details open>
        <summary>v3</summary>
        <HighchartsReact highcharts={Highcharts} options={options3} />
      </details>
    </div>
  );
};
