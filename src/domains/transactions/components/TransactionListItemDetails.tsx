/** @format */

interface ITransactionDetailsProps {
  transactionId: string;
}

export const TransactionListItemDetails = ({ transactionId }: ITransactionDetailsProps) => {
  return (
    <td
      colSpan={6}
      className={`
        p-2
        text-sm`}
    >
      <p>Details for transactionId: {transactionId}</p>
    </td>
  );
};
