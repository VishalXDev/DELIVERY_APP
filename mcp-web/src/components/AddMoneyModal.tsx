import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
};

export default function AddMoneyModal({ open, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    if (amount > 0) {
      onSubmit(amount);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Money</h2>
        <input
          type="number"
          placeholder="Enter amount"
          min={1}
          autoFocus
          className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-gray-600 px-4 py-1 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
