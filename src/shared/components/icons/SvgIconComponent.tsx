/** @format */

interface ISvgIconProps {
  icon: JSX.Element;
  handleClick?: () => void;
}

export const SvgIcon = ({ icon, handleClick }: ISvgIconProps) => (
  <span
    className='hover:text-blue-500'
    onClick={event => {
      event.stopPropagation();
      handleClick && handleClick();
    }}
  >
    {icon}
  </span>
);
