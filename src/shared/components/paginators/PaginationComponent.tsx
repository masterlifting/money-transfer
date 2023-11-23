/** @format */

import { IPagination, PaginationPageItemsCountType } from './PaginationTypes';

const pageItems: PaginationPageItemsCountType[] = [10, 20, 30, 40, 50];

interface IPaginatorProps {
  totalItemsCount: number;
  configuration: IPagination;
  setPaginator: (configuration: IPagination) => void;
}

export const Paginator = ({ totalItemsCount, configuration, setPaginator }: IPaginatorProps) => {
  return (
    <div className='flex justify-end items-center mt-2'>
      {configuration.pageNumber !== 1 && (
        <button
          className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
          onClick={_ => setPaginator({ ...configuration, pageNumber: configuration.pageNumber - 1 })}
        >
          {'<<'}
        </button>
      )}

      <div className='grid grid-row-1'>
        <span className='font-bold text-sm justify-self-center text-blue-600'>{configuration.pageNumber}</span>
        <div>
          {pageItems
            .filter(item => totalItemsCount >= configuration.pageNumber * item)
            .map(
              item =>
                item <= totalItemsCount && (
                  <span
                    key={item}
                    className={`text-black text-sm py-1 px-2 cursor-pointer hover:font-bold ${
                      item === configuration.pageItemsCount && ' font-bold'
                    }`}
                    onClick={_ => setPaginator({ ...configuration, pageNumber: 1, pageItemsCount: item })}
                  >
                    {item}
                  </span>
                ),
            )}
        </div>
      </div>

      {totalItemsCount > configuration.pageNumber * configuration.pageItemsCount && (
        <button
          className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
          onClick={_ => setPaginator({ ...configuration, pageNumber: configuration.pageNumber + 1 })}
        >
          {'>>'}
        </button>
      )}
    </div>
  );
};
