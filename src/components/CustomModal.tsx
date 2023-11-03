/** @format */

interface IModalProps {
  children: React.ReactNode;
  title: string;
}

export const CustomModal = ({ children, title }: IModalProps) => {
  return (
    <>
      <div className='fixed bg-black/50 top-0 bottom-0 left-0 right-0 '></div>
      <div className='absolute bg-white p-5 rounded-md left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3'>
        <h1 className='text-xl font-bold mb-2'>{title}</h1>
        {children}
      </div>
    </>
  );
};
