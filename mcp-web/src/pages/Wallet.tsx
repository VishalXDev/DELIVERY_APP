import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import WalletCard from "../components/WalletCard";
import AddMoneyModal from "../components/AddMoneyModal";
import TransactionsTable from "../components/TransactionsTable";
import { fetchWalletData, addMoneyToWallet } from "../services/api";
import { Transaction } from "../types";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);

  const loadWallet = async () => {
    const data = await fetchWalletData();
    setBalance(data.balance);
    setTransactions(data.transactions);
  };

  const handleAddMoney = async (amount: number) => {
    await addMoneyToWallet(amount);
    loadWallet();
  };

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Wallet & Transactions</h1>
      <WalletCard balance={balance} onAdd={() => setShowModal(true)} />
      <TransactionsTable transactions={transactions} />
      <AddMoneyModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddMoney} />
    </Layout>
  );
}
