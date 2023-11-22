/** @format */

interface ITransactionDetailsProps {
  transactionId: string;
}

export const UserTransactionDetails = ({ transactionId }: ITransactionDetailsProps) => {
  return (
    <div
      className={`
        p-2
        text-sm`}
    >
      <p>Details for transactionId: {transactionId}</p>
    </div>
  );
};