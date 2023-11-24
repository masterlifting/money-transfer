/** @format */

import React from 'react';
import { IPagination, PaginationPageItemsCountType } from './PaginationTypes';
import { HoveredTextColors, TextColors } from '../../styles/Colors';

const pageItemsCounts: PaginationPageItemsCountType[] = [10, 20, 30, 40, 50];

interface IPaginatorProps {
  totalItemsCount: number;
  pageItemsCount: number;
  configuration: IPagination;
  setPaginator: (configuration: IPagination) => void;
}

export const Paginator = ({ totalItemsCount, pageItemsCount, configuration, setPaginator }: IPaginatorProps) => {
  const pageNumbersCount = Math.ceil(totalItemsCount / configuration.pageItemsCount);

  return (
    <div className='flex justify-end items-center mt-2'>
      {configuration.pageNumber !== 1 && (
        <div className='flex gap-2 items-center'>
          <span className={HoveredTextColors.Primary} onClick={_ => setPaginator({ ...configuration, pageNumber: 1 })}>
            {'<<'}
          </span>
          <span
            className={HoveredTextColors.Primary}
            onClick={_ => setPaginator({ ...configuration, pageNumber: configuration.pageNumber - 1 })}
          >
            {'<'}
          </span>
        </div>
      )}

      <div className='flex flex-col-2 px-2 gap-1 items-center'>
        {pageItemsCount === configuration.pageItemsCount && (
          <select
            className='cursor-pointer'
            value={configuration.pageItemsCount}
            onChange={event => {
              const _pageItemsCount = parseInt(event.target.value) as PaginationPageItemsCountType;
              setPaginator({ ...configuration, pageNumber: 1, pageItemsCount: _pageItemsCount });
            }}
          >
            {pageItemsCounts
              .filter(_pageItemsCount => totalItemsCount >= configuration.pageNumber * _pageItemsCount)
              .map(
                _pageItemsCount =>
                  _pageItemsCount <= totalItemsCount && (
                    <option
                      key={_pageItemsCount}
                      className={_pageItemsCount === configuration.pageItemsCount ? TextColors.Primary + 'font-bold' : ''}
                    >
                      {_pageItemsCount}
                    </option>
                  ),
              )}
          </select>
        )}
        <div className='flex gap-1 text-sm'>
          {Array.from({ length: pageNumbersCount }).map((_, index) => {
            const pageNumber = index + 1;

            const isNearCurrentPage =
              Math.abs(pageNumber - configuration.pageNumber) <= 1 || pageNumber === 1 || pageNumber === pageNumbersCount;

            const shouldShowEllipsis =
              !isNearCurrentPage && index !== 0 && index !== pageNumbersCount - 1 && pageNumbersCount > 5;

            return (
              <React.Fragment key={pageNumber}>
                {shouldShowEllipsis && index === 1 && <span className='text-sm'>. . .</span>}
                {isNearCurrentPage && (
                  <span
                    className={`${HoveredTextColors.Primary}${
                      pageNumber === configuration.pageNumber && TextColors.Primary + 'font-bold'
                    }`}
                    onClick={() => setPaginator({ ...configuration, pageNumber })}
                  >
                    {pageNumber}
                  </span>
                )}
                {shouldShowEllipsis && index === pageNumbersCount - 2 && <span className='text-sm'>. . .</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {totalItemsCount > configuration.pageNumber * configuration.pageItemsCount && (
        <div className='flex gap-2 items-center'>
          <span
            className={HoveredTextColors.Primary}
            onClick={_ => setPaginator({ ...configuration, pageNumber: configuration.pageNumber + 1 })}
          >
            {'>'}
          </span>
          <span
            className={HoveredTextColors.Primary}
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
