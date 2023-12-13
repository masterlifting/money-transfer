/** @format */

import { TextColor } from '../../styles/Colors';
import { ISorting } from './SortingFieldTypes';

interface ISortingFieldProps {
  name: string;
  configuration: ISorting;
  setSorting: (config: ISorting) => void;
}

export const SortingField = ({ name, configuration, setSorting }: ISortingFieldProps) => {
  return (
    <span
      onClick={() =>
        setSorting({
          ...configuration,
          fieldName: name,
          direction: configuration.direction === 'asc' ? 'desc' : 'asc',
        })
      }
      className={`cursor-pointer ${configuration.fieldName === name && TextColor.Primary}`}
    >
      {configuration.fieldName === name ? (configuration.direction === 'asc' ? '▲' : '▼') : ''}
      {name}
    </span>
  );
};
