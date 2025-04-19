import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
};

export default function AddMoneyModal({ open, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Money</h2>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border p-2 mb-4"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={() => { onSubmit(amount); onClose(); }} className="bg-blue-600 text-white px-4 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
