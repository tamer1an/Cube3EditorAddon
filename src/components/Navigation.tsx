import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';

export const Navigation = (props: any) => {
  const history = useHistory();

  return (
    <div>
      <Link to="/">
      </Link>
      <hr />
      <details>
         <pre>
           {props.stats}
         </pre>
        <summary>
        Stats:
        </summary>
      </details>
    </div>
  );
};
