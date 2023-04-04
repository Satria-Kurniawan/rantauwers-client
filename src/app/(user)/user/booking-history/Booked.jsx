import Order from "./Order";

export default function Booked({ orders }) {
  if (!orders) return <div>Failed to load data.</div>;

  return (
    <main className="flex flex-col gap-y-3">
      {orders.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </main>
  );
}
