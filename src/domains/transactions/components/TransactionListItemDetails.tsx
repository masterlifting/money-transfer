/** @format */

interface ITransactionDetailsProps {
  transactionId: string;
}

export const TransactionListItemDetails = ({ transactionId }: ITransactionDetailsProps) => {
  return (
    <div
      className={`
        border-b-2
        rounded-b-md
        border-gray-200
        p-2
        text-gray-600
        text-sm
        bg-yellow-100`}
    >
      <p>Details for transactionId: {transactionId}</p>
    </div>
  );
};
