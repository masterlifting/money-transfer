/** @format */

const baseStyle = 'text-white px-5 py-1 mt-2 rounded-md transition duration-200 ease-in-out';
const baseActiveColorValue = '300';
const baseHoverColorValue = '500';

export const buttonStyle = {
  success: baseStyle + ' bg-green-' + baseActiveColorValue + ' hover:bg-green-' + baseHoverColorValue,
  primary: baseStyle + ' bg-blue-' + baseActiveColorValue + ' hover:bg-blue-' + baseHoverColorValue,
  secondary: baseStyle + ' bg-gray-' + baseActiveColorValue + ' hover:bg-gray-' + baseHoverColorValue,
  danger: baseStyle + ' bg-red-' + baseActiveColorValue + ' hover:bg-red-' + baseHoverColorValue,
  warning: baseStyle + ' bg-yellow-' + baseActiveColorValue + ' hover:bg-yellow-' + baseHoverColorValue,
  disable: baseStyle + ' bg-gray-' + baseActiveColorValue + ' disabled:cursor-not-allowed',
};
