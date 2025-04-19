import { useState, useEffect } from "react";
import { User, PartnerFormData } from "../types"; // ✅ import the new type

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: PartnerFormData) => void; // ✅ use typed data
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">{initialData ? "Edit Partner" : "Add Partner"}</h2>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="number"
          placeholder="Commission %"
          value={form.commission}
          onChange={(e) => setForm({ ...form, commission: Number(e.target.value) })}
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button onClick={() => onSave(form)} className="bg-blue-600 text-white px-4 py-1 rounded">
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
