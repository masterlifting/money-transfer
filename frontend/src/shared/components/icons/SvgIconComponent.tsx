/** @format */

import React from 'react';
import { HoveredTextColor } from '../../styles/colors';

interface ISvgIconProps {
  title?: string;
  icon: JSX.Element;
  handleClick?: () => void;
}

export const SvgIcon = ({ icon, title, handleClick }: ISvgIconProps) => (
  <span
    title={title}
    className={HoveredTextColor.Primary}
    onClick={event => {
      event.stopPropagation();
      handleClick && handleClick();
    }}
  >
    {icon}
  </span>
);
