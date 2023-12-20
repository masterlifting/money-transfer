/** @format */

import React from 'react';
import { HoveredTextColor } from '../../styles/colors';
import { ISorting } from '../../../../../shared/interfaces';

interface ISortingFieldProps {
  name: string; // name of the field will be used for sorting on the backend
  state: ISorting;
  setState: (config: ISorting) => void;
}

export const SortingField = ({ name, state, setState }: ISortingFieldProps) => {
  return (
    <span
      onClick={() =>
        setState({
          ...state,
          fieldName: name,
          direction: state.direction === 'asc' ? 'desc' : 'asc',
        })
      }
      className={HoveredTextColor.Primary}
    >
      {state.fieldName === name ? (state.direction === 'asc' ? '▲' : '▼') : ''}
      {name}
    </span>
  );
};
