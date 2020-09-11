import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';

export const Navigation = (state: any) => {
  const history = useHistory();

  return (
    <div>
      <Link to="/">
      </Link>
      <hr />
      navigation
    </div>
  );
};
