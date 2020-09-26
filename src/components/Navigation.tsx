import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { Link } from 'react-router-dom';

const basicStyles = {
  textOverflow: 'ellipsis',
  maxWidth: '300px',
  overflow: 'hidden',
};

export const Navigation = ({ stats: { preInit, layerTime } }: any) => {
  const history = useHistory();

  const genInfoSpan = (collection: Array<any>, color = 'white') => {
    return collection.length <= 0 || collection.map((v: any, key: number) => {
      return (
        <p title={v} key={key} style={{ ...basicStyles, color }}>
          <b>{v}</b>
        </p>
      )
    });
  };

  const genDetails = (slice: Array<any>, summary: string, color = 'grey') => {
    return <details>
      {genInfoSpan(slice, color)}
      <summary>{summary}</summary>
    </details>
  };

  const VERSION_ENDS = 5;
  const MATERIAL_ENDS = 11;

  const versionSlice = preInit.slice(0, VERSION_ENDS);
  const materialSlice = preInit.slice(VERSION_ENDS, MATERIAL_ENDS);
  const otherSlice = preInit.slice(MATERIAL_ENDS, -2);
  const restSlice = preInit.slice(-2);

  let { ModelHeight, LayerCount, Sidewalks, Supports /*, Density, Pattern, Raft*/ } =
    otherSlice
      .slice(0, -1)
      .reduce((acc: Object, [val]: [string]) => {
        const row = val.replaceAll('^', '').split(':');
        return { ...acc, [row[0]]: row[1] };
      }, {});

  // Draw preInit settings
  return (
    <div>
      <Link to="/"></Link>
      <hr />
      <details open>
        <pre>
          {genDetails(versionSlice, 'Version info')}
          {genDetails(materialSlice, 'Materials info')}
          {genDetails(otherSlice, 'Settings properties')}
          {genDetails(restSlice, 'Other properties')}
          <br/>
          {/*{Object.entries({Density, Pattern, Raft}).map((v)=>{*/}
          {/*  return <p>{v[0]}: {v[1]}</p>*/}
          {/*})}*/}
        </pre>
        <summary>
          Layers: ({LayerCount && LayerCount.trim()})
          Height: ({Math.floor(ModelHeight)})
          Time: ({Math.floor(layerTime
            ?.map((v: Array<any>) => v[1])
            .reduce((acc: number, v: string) => Number(v) + acc, 0))})
          Sidewalks: ({ Number(Sidewalks) === -1 ? 'No' : 'Yes' })
          Supports: ({ Number(Supports) === -1 ? 'No' : 'Yes' })
        </summary>
      </details>
    </div>
  );
};
