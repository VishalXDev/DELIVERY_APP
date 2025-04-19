type StatCardProps = {
    title: string;
    value: string | number;
    color?: string;
  };
  
  export default function StatCard({ title, value, color = "bg-blue-500" }: StatCardProps) {
    return (
      <div className={`p-4 rounded-xl shadow-md text-white ${color}`}>
        <h2 className="text-sm uppercase">{title}</h2>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  