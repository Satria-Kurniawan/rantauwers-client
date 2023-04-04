"use client";

import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { MdHelp, MdHome } from "react-icons/md";
import { SiHomebridge } from "react-icons/si";
import { signOut } from "next-auth/react";
import Dropdown from "../Dropdown";
import Link from "next/link";

export default function AdminHeader({ session, children }) {
  const pathname = usePathname();

  let pageTitle = pathname.split("/")[2];

  if (pageTitle.includes("-")) {
    const firstChar = pageTitle.split("-")[0];
    const firstCharUppercase =
      firstChar.charAt(0).toUpperCase() + firstChar.slice(1);
    const secondChar = pageTitle.split("-")[1];
    const secondCharUppercase =
      secondChar.charAt(0).toUpperCase() + secondChar.slice(1);

    pageTitle = firstCharUppercase + " " + secondCharUppercase;
  } else {
    pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  }

  return (
    <header className="flex justify-between mb-5">
      <section>
        <h1 className="text-xl font-bold">{pageTitle}</h1>
        <p className="text-sm text-info">{pathname}</p>
      </section>
      <section className="flex gap-x-5">
        <div>{children}</div>
        <Dropdown>
          <Dropdown.Trigger>
            <div className="h-fit py-2 px-4 rounded-lg bg-primary text-white inline-flex gap-x-3 items-center">
              <span>{session?.user.name}</span>
              {session?.user.avatar ? "" : <FaUserCircle size={25} />}
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content className="min-w-[12rem] mt-5">
            <ul>
              <Link href={"/node_modules"}>
                <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                  <span>
                    <SiHomebridge size={25} />
                  </span>
                  <span>Home</span>
                </li>
              </Link>
              <Link href={"/node_modules"}>
                <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                  <span>
                    <MdHelp size={25} />
                  </span>
                  <span>Bantuan</span>
                </li>
              </Link>
              <li
                onClick={() => signOut({ callbackUrl: "/admin/dashboard" })}
                className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer"
              >
                <span>
                  <RiLogoutCircleRFill size={25} />
                </span>
                <span>Keluar</span>
              </li>
            </ul>
          </Dropdown.Content>
        </Dropdown>
      </section>
    </header>
  );
}
