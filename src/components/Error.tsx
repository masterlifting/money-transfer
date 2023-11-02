/** @format */

interface IErrorProps {
  message: string;
}

export const Error = ({ message }: IErrorProps) => {
  return <p className='text-red-500 text-sm'>{message}</p>;
};
