/** @format */

import { HoveredTextColor } from '../../styles/Colors';

interface ISvgIconProps {
  icon: JSX.Element;
  handleClick?: () => void;
}

export const SvgIcon = ({ icon, handleClick }: ISvgIconProps) => (
  <span
    className={HoveredTextColor.Primary}
    onClick={event => {
      event.stopPropagation();
      handleClick && handleClick();
    }}
  >
    {icon}
  </span>
);
