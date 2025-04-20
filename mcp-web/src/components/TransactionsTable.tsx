import React from "react";
import { Transaction } from "../types"; // Import the Transaction type
import { format } from "date-fns"; // Use date-fns for date formatting

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <div className="p-4 text-center text-gray-500">No transactions available</div>;
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{transaction._id}</td>
              <td className="px-6 py-4">₹{transaction.amount.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span
                  className={`${
                    transaction.type === "credit" ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {transaction.type.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4">{transaction.description}</td>
              <td className="px-6 py-4">{format(new Date(transaction.date), "dd/MM/yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
