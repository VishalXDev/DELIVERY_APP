import { useState, useEffect } from "react";
import { User, PartnerFormData } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: PartnerFormData) => void;
  initialData?: User | null;
};

export default function PartnerModal({ open, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<PartnerFormData>({
    name: "",
    email: "",
    phone: "",
    commission: 10,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        phone: "",
        commission: initialData.commission,
      });
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name || !form.email || form.commission < 0) {
      alert("Please fill in all required fields properly.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Partner" : "Add Partner"}
        </h2>

        <div className="space-y-3 mb-4">
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            type="number"
            placeholder="Commission %"
            value={form.commission}
            onChange={(e) =>
              setForm({ ...form, commission: Number(e.target.value) })
            }
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
