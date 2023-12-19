/** @format */

import React from 'react';
import { TextColor } from '../../../../shared/styles/colors';

interface ITransactionDetailsProps {
  transactionId: string;
  description?: string;
}

export const ShowUserTransactionDetails = ({ transactionId, description }: ITransactionDetailsProps) => {
  return (
    <div className={`${TextColor.Secondary} p-2 text-sm`}>
      {description ? <p>{description}</p> : <p>Here we can show the details of the transaction with id: {transactionId}</p>}
    </div>
  );
};
