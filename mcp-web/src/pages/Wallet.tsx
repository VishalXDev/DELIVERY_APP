import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import WalletCard from "../components/WalletCard";
import AddMoneyModal from "../components/AddMoneyModal";
import TransactionsTable from "../components/TransactionsTable";
import { fetchWalletData, addMoneyToWallet } from "../services/api";
import { Transaction } from "../types";

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

export default function Wallet() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadWallet = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const data: WalletData = await fetchWalletData();
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch (err) {
      setError("Failed to load wallet data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async (amount: number) => {
    setLoading(true);
    try {
      await addMoneyToWallet(amount);
      loadWallet(); // Reload wallet data after adding money
    } catch (err) {
      setError("Failed to add money to wallet. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Wallet & Transactions</h1>
        <div className="text-center my-4">Loading...</div>
        {/* Optional: Add a spinner component */}
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Wallet & Transactions</h1>
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Wallet & Transactions</h1>
      <WalletCard balance={balance} onAdd={() => setShowModal(true)} />
      <TransactionsTable transactions={transactions} />
      <AddMoneyModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddMoney} />
    </Layout>
  );
}
