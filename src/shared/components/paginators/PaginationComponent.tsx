/** @format */

import { IPagination, PaginationPageItemsCountType } from './PaginationTypes';

const pageItemsCounts: PaginationPageItemsCountType[] = [10, 20, 30, 40, 50];

interface IPaginatorProps {
  totalItemsCount: number;
  pageItemsCount: number;
  configuration: IPagination;
  setPaginator: (configuration: IPagination) => void;
}

export const Paginator = ({ totalItemsCount, pageItemsCount, configuration, setPaginator }: IPaginatorProps) => {
  return (
    <div className='flex justify-end items-center mt-2'>
      {configuration.pageNumber !== 1 && (
        <div className='flex gap-2 items-center'>
          <span className='hover:text-blue-400 cursor-pointer' onClick={_ => setPaginator({ ...configuration, pageNumber: 1 })}>
            {'<<'}
          </span>
          <span
            className='hover:text-blue-400 cursor-pointer'
            onClick={_ => setPaginator({ ...configuration, pageNumber: configuration.pageNumber - 1 })}
          >
            {'<'}
          </span>
        </div>
      )}

      <div className='flex flex-col-2 px-2 gap-1 items-center'>
        {pageItemsCount === configuration.pageItemsCount && (
          <select className='cursor-pointer' value={configuration.pageItemsCount} onChange={_ => {}}>
            {pageItemsCounts
              .filter(_pageItemsCount => totalItemsCount >= configuration.pageNumber * _pageItemsCount)
              .map(
                _pageItemsCount =>
                  _pageItemsCount <= totalItemsCount && (
                    <option
                      key={_pageItemsCount}
                      className={`text-black text-sm cursor-pointer hover:font-bold ${
                        _pageItemsCount === configuration.pageItemsCount && ' font-bold'
                      }`}
                      onClick={_ => setPaginator({ ...configuration, pageNumber: 1, pageItemsCount: _pageItemsCount })}
                    >
                      {_pageItemsCount}
                    </option>
                  ),
              )}
          </select>
        )}
        <div className='flex gap-1 text-sm'>
          {Array.from(Array(Math.ceil(totalItemsCount / configuration.pageItemsCount)).keys()).map(
            pageNumber =>
              pageNumber <= Math.ceil(totalItemsCount / configuration.pageItemsCount) && (
                <span
                  key={pageNumber}
                  className={`hover:text-blue-400 cursor-pointer ${
                    pageNumber === configuration.pageNumber && 'font-bold text-blue-400'
                  }`}
                  onClick={_ => setPaginator({ ...configuration, pageNumber: pageNumber + 1 })}
                >
                  {pageNumber + 1}
                </span>
              ),
          )}
        </div>
      </div>

      {totalItemsCount > configuration.pageNumber * configuration.pageItemsCount && (
        <div className='flex gap-2 items-center'>
          <span
            className='hover:text-blue-400 cursor-pointer'
            onClick={_ => setPaginator({ ...configuration, pageNumber: configuration.pageNumber + 1 })}
          >
            {'>'}
          </span>
          <span
            className='hover:text-blue-400 cursor-pointer'
            onClick={_ =>
              setPaginator({ ...configuration, pageNumber: Math.ceil(totalItemsCount / configuration.pageItemsCount) })
            }
          >
            {'>>'}
          </span>
        </div>
      )}
    </div>
  );
};
