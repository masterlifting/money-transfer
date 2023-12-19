/** @format */

import React from 'react';
import { HoveredTextColor, TextColor } from '../../styles/colors';
import { IPagination } from '../../../../../shared/interfaces';
import { PaginationPageItemsCountType } from '../../../../../shared/types';

const pageItemsCounts: PaginationPageItemsCountType[] = [10, 20, 30, 40, 50];

interface IPaginatorProps {
  totalItemsCount: number;
  pageItemsCount: number;
  state: IPagination;
  setPaginatonState: (configuration: IPagination) => void;
}

export const Paginator = ({ totalItemsCount, pageItemsCount, state, setPaginatonState }: IPaginatorProps) => {
  const pageNumbersCount = Math.ceil(totalItemsCount / state.pageItemsCount);

  return (
    <div className='flex justify-end items-center mt-2'>
      {state.pageNumber !== 1 && (
        <div className='flex gap-2 items-center'>
          <span className={HoveredTextColor.Primary} onClick={_ => setPaginatonState({ ...state, pageNumber: 1 })}>
            {'<<'}
          </span>
          <span
            className={HoveredTextColor.Primary}
            onClick={_ => setPaginatonState({ ...state, pageNumber: state.pageNumber - 1 })}
          >
            {'<'}
          </span>
        </div>
      )}

      <div className='flex flex-col-2 px-2 gap-1 items-center'>
        {pageItemsCount === state.pageItemsCount && (
          <select
            name='pageItemsCount'
            title='Records per page'
            className='cursor-pointer'
            value={state.pageItemsCount}
            onChange={event => {
              const _pageItemsCount = parseInt(event.target.value) as PaginationPageItemsCountType;
              setPaginatonState({ ...state, pageNumber: 1, pageItemsCount: _pageItemsCount });
            }}
          >
            {pageItemsCounts
              .filter(_pageItemsCount => totalItemsCount >= state.pageNumber * _pageItemsCount)
              .map(
                _pageItemsCount =>
                  _pageItemsCount <= totalItemsCount && (
                    <option
                      key={_pageItemsCount}
                      className={_pageItemsCount === state.pageItemsCount ? TextColor.Primary + 'font-bold' : ''}
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
              Math.abs(pageNumber - state.pageNumber) <= 1 || pageNumber === 1 || pageNumber === pageNumbersCount;

            const shouldShowEllipsis =
              !isNearCurrentPage && index !== 0 && index !== pageNumbersCount - 1 && pageNumbersCount > 5;

            return (
              <React.Fragment key={pageNumber}>
                {shouldShowEllipsis && index === 1 && <span className='text-sm'>. . .</span>}
                {isNearCurrentPage && (
                  <span
                    className={`${HoveredTextColor.Primary}${pageNumber === state.pageNumber && TextColor.Primary + 'font-bold'}`}
                    onClick={() => setPaginatonState({ ...state, pageNumber })}
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

      {totalItemsCount > state.pageNumber * state.pageItemsCount && (
        <div className='flex gap-2 items-center'>
          <span
            className={HoveredTextColor.Primary}
            onClick={_ => setPaginatonState({ ...state, pageNumber: state.pageNumber + 1 })}
          >
            {'>'}
          </span>
          <span
            className={HoveredTextColor.Primary}
            onClick={_ => setPaginatonState({ ...state, pageNumber: Math.ceil(totalItemsCount / state.pageItemsCount) })}
          >
            {'>>'}
          </span>
        </div>
      )}
    </div>
  );
};
