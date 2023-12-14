/** @format */

import React from 'react';
import { TextColor } from '../../styles/colors';
import { ISorting } from '../../../../../shared/types/sortingFieldTypes';

interface ISortingFieldProps {
  name: string;
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
      className={`cursor-pointer ${state.fieldName === name && TextColor.Primary}`}
    >
      {state.fieldName === name ? (state.direction === 'asc' ? '▲' : '▼') : ''}
      {name}
    </span>
  );
};
