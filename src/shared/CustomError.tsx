/** @format */

interface IErrorProps {
  message: string;
}

export const CustomError = ({ message }: IErrorProps) => {
  return <p className='text-red-500 text-sm'>{message}</p>;
};
