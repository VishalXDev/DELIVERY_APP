import React from "react";
import { Transaction } from "../types"; // Import the Transaction type

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
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
              <td className="px-6 py-4">₹{transaction.amount}</td>
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
              <td className="px-6 py-4">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
