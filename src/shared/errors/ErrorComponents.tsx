/** @format */

interface IErrorProps {
  message: string;
}

export const ValidationError = ({ message }: IErrorProps) => {
  return <span className='text-red-500 text-sm'>{message}</span>;
};
