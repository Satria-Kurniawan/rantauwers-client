"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { adminSidebarLinks } from "@/constants";
import { Zen_Dots } from "next/font/google";
import Link from "next/link";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside className={`${isOpen ? "w-72" : "w-20"} h-screen p-5 duration-300`}>
      <div className="flex gap-x-5 px-2">
        <span className="cursor-pointer hover:text-primary">
          <FaBars
            onClick={() => setIsOpen(!isOpen)}
            size={20}
            className={isOpen ? "text-primary" : "rotate-[360deg] duration-300"}
          />
        </span>
        <Link href={"/"}>
          <span
            className={`${zendots.className} ${
              !isOpen && "-translate-x-5 opacity-0"
            } duration-300`}
          >
            Rantauwers
          </span>
        </Link>
      </div>
      <ul className="flex flex-col gap-y-5 mt-16">
        {adminSidebarLinks.map(({ name, icon, path }, i) => (
          <li key={i}>
            <Link href={path}>
              <div
                className={`${
                  pathname === path && "bg-primary text-white"
                } rounded-lg flex gap-x-5 py-2 cursor-pointer hover:bg-primary hover:text-white px-2`}
              >
                <span>{icon}</span>
                <span
                  className={`${
                    !isOpen &&
                    "-translate-x-5 opacity-0 pointer-events-none duration-300"
                  }`}
                >
                  {name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
