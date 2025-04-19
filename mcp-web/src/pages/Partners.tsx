import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PartnerCard from "../components/PartnerCard";
import PartnerModal from "../components/PartnerModal";
import { fetchPartners, addPartner, updatePartner, deletePartner } from "../services/api";
import { User } from "../types";

// Define a type for the form data with required fields
type PartnerForm = {
  name: string;
  email: string;
  phone: string;
  commission: number;
};

export default function Partners() {
  const [partners, setPartners] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const loadPartners = async () => {
    const data = await fetchPartners();
    setPartners(data);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  // Change form type to `PartnerForm`
  const handleAddEdit = async (form: PartnerForm) => {
    if (editing) {
      await updatePartner(editing._id, form);
    } else {
      await addPartner(form);
    }
    setShowModal(false);
    setEditing(null);
    loadPartners();
  };

  const handleDelete = async (id: string) => {
    await deletePartner(id);
    loadPartners();
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pickup Partner Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner) => (
          <PartnerCard
            key={partner._id}
            partner={partner}
            onEdit={(p) => {
              setEditing(p);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <PartnerModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        onSave={handleAddEdit}
        initialData={editing}
      />
    </Layout>
  );
}
