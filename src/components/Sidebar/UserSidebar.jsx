"use client";

import { usePathname } from "next/navigation";
import { userSidebarLinks } from "@/constants";
import Link from "next/link";

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[26rem]">
      <ul className="w-full flex flex-col gap-y-5">
        {userSidebarLinks.map((link, i) => (
          <li
            key={i}
            className={`py-2 border-b ${
              link.path === pathname && "border-l-[6px] border-primary pl-4"
            }`}
          >
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
