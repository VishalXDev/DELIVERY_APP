type StatCardProps = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "bg-blue-500",
}: StatCardProps) {
  // Formatting the value if it's a number
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={`p-4 rounded-xl shadow-md text-white ${color} transition-all hover:scale-105`}
      role="statistic"
    >
      <h2 className="text-sm uppercase">{title}</h2>
      <p className="text-2xl font-bold mt-2">{formattedValue}</p>
    </div>
  );
}
