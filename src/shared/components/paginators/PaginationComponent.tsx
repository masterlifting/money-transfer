/** @format */

interface IPaginatorProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Paginator = ({ page, totalPages, setPage }: IPaginatorProps) => {
  return (
    <div className='flex justify-end items-center mt-2'>
      <button
        className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>
      <span className='text-black text-sm py-1 px-2 cursor-pointer hover:font-bold'>{page}</span>
      <button
        className='hover:text-blue-600 text-gray-600 font-bold py-1 px-2 cursor-pointer'
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};
