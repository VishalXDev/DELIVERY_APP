type Props = {
    balance: number;
    onAdd: () => void;
  };
  
  export default function WalletCard({ balance, onAdd }: Props) {
    return (
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Admin Wallet</h2>
          <p className="text-2xl text-green-600 font-semibold">₹{balance}</p>
        </div>
        <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Money
        </button>
      </div>
    );
  }
  