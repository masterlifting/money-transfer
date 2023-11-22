/** @format */

import { useEffect, useState } from 'react';

export type PageItemsType = 10 | 20 | 30 | 40 | 50;

const pageItemsType: PageItemsType[] = [10, 20, 30, 40, 50];

interface IPaginatorProps {
  itemsTotalCount: number;
  setItemsPerPage: (pageItemsCount: PageItemsType, pageNumber: number) => void;
}

export const Paginator = ({ itemsTotalCount, setItemsPerPage }: IPaginatorProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageItemsCount, setPageItemsCount] = useState<PageItemsType>(10);

  useEffect(() => {
    setItemsPerPage(pageItemsCount, pageNumber);
  }, [pageNumber, pageItemsCount]);

  return (
    <div className='flex justify-end items-center mt-2'>
      {pageNumber !== 1 && (
        <button
          className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
          onClick={() => setPageNumber(prev => prev - 1)}
        >
          {'<<'}
        </button>
      )}

      <div className='grid grid-row-1'>
        <span className='font-bold text-sm justify-self-center text-blue-600'>{pageNumber}</span>
        <div>
          {pageItemsType
            .filter(item => itemsTotalCount >= pageNumber * item)
            .map(
              item =>
                item <= itemsTotalCount && (
                  <span
                    key={item}
                    className={`text-black text-sm py-1 px-2 cursor-pointer hover:font-bold ${
                      item === pageItemsCount && ' font-bold'
                    }`}
                    onClick={() => {
                      setPageItemsCount(item);
                    }}
                  >
                    {item}
                  </span>
                ),
            )}
        </div>
      </div>

      {itemsTotalCount > pageNumber * pageItemsCount && (
        <button
          className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
          onClick={() => setPageNumber(prev => prev + 1)}
        >
          {'>>'}
        </button>
      )}
    </div>
  );
};
