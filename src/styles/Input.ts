/** @format */

const baseStyle = 'border border-gray-300 rounded-md my-1 py-1 px-2';

export const inputStyle = {
  text: baseStyle + ' focus:outline-none focus:ring-2 focus:ring-blue-300 ',
  select: {
    base: baseStyle + ' focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer ',
    option: 'cursor-pointer',
  },
};
