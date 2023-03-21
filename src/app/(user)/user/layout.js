import UserSidebar from "@/components/Sidebar/UserSidebar";

export default function UserLayout({ children }) {
  return (
    <section className="flex">
      <UserSidebar />
      <div className="ml-3 w-full min-h-[75vh] rounded-lg border p-5">
        {children}
      </div>
    </section>
  );
}
