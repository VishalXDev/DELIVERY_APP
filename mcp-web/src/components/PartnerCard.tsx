import { User } from "../types";

type Props = {
  partner: User;
  onEdit: (partner: User) => void;
  onDelete: (id: string) => void;
};

export default function PartnerCard({ partner, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
      <div>
        <h2 className="font-bold text-lg">{partner.name}</h2>
        <p className="text-sm text-gray-500">{partner.email}</p>
        <p className="text-sm text-gray-600">Commission: {partner.commission}%</p>
        <p className="text-sm">{partner.isActive ? "🟢 Active" : "🔴 Inactive"}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(partner)} className="text-blue-600">Edit</button>
        <button onClick={() => onDelete(partner._id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}
