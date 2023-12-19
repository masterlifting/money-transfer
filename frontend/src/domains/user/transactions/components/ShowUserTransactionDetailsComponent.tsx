/** @format */

import React, { useEffect, useState } from 'react';
import { TextColor } from '../../../../shared/styles/colors';

interface ITransactionDetailsProps {
  transactionId: string;
  description?: string;
}

export const ShowUserTransactionDetails = ({ transactionId, description }: ITransactionDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${TextColor.Secondary} p-2 text-sm transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {description ? <p>{description}</p> : <p>Details or message for the transaction with id: {transactionId}</p>}
    </div>
  );
};
