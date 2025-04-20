import { User } from "../types";

type Props = {
  partner: User;
  onEdit: (partner: User) => void;
  onDelete: (id: string) => void;
};

export default function PartnerCard({ partner, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-start">
      <div className="space-y-1">
        <h2 className="text-lg font-bold">{partner.name}</h2>
        <p className="text-sm text-gray-500">{partner.email}</p>
        <p className="text-sm text-gray-600">
          Commission: <span className="font-medium">{partner.commission}%</span>
        </p>
        <p className="text-sm">
          {partner.isActive ? "🟢 Active" : "🔴 Inactive"}
        </p>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <button
          onClick={() => onEdit(partner)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(partner._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
