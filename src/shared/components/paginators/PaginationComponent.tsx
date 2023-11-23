/** @format */

import { useEffect, useState } from 'react';
import { IPagination, PaginationPageItemsCountType } from './PaginationTypes';

const pageItems: PaginationPageItemsCountType[] = [10, 20, 30, 40, 50];

interface IPaginatorProps {
  configuration: IPagination;
  setPaginator: (configuration: IPagination) => void;
}

export const Paginator = ({ configuration, setPaginator }: IPaginatorProps) => {
  const [config, setConfig] = useState(configuration);

  useEffect(() => {
    setPaginator(config);
  }, [config, configuration]);

  return (
    <div className='flex justify-end items-center mt-2'>
      {config.pageNumber !== 1 && (
        <button
          className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
          onClick={() => setConfig(prev => ({ ...prev, pageNumber: prev.pageNumber - 1 }))}
        >
          {'<<'}
        </button>
      )}

      <div className='grid grid-row-1'>
        <span className='font-bold text-sm justify-self-center text-blue-600'>{config.pageNumber}</span>
        <div>
          {pageItems
            .filter(item => config.itemsTotalCount >= config.pageNumber * item)
            .map(
              item =>
                item <= config.itemsTotalCount && (
                  <span
                    key={item}
                    className={`text-black text-sm py-1 px-2 cursor-pointer hover:font-bold ${
                      item === config.pageItemsCount && ' font-bold'
                    }`}
                    onClick={() => {
                      setConfig(prev => ({ ...prev, pageItemsCount: item }));
                    }}
                  >
                    {item}
                  </span>
                ),
            )}
        </div>
      </div>

      {config.totalItemsCount > config.pageNumber * config.pageItemsCount && (
        <button
          className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
          onClick={() => setConfig(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }))}
        >
          {'>>'}
        </button>
      )}
    </div>
  );
};
