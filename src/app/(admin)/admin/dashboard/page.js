import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import AdminHeader from "@/components/Header/AdminHeader";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <AdminHeader session={session} />
    </div>
  );
}
