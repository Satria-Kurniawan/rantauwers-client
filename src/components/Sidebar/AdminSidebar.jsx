"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { adminSidebarLinks } from "@/constants";
import { Zen_Dots } from "next/font/google";
import Link from "next/link";
import {
  BsMoonStarsFill,
  BsFillSunFill,
  BsCaretRightFill,
} from "react-icons/bs";
import Hamburger from "../Hamburger";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedIsDarkMode = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedIsDarkMode);
  }, []);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <aside
      className={`${
        isOpen ? "w-80" : "w-20"
      } h-screen bg-white dark:bg-dark2 sticky top-0 p-5 duration-300`}
    >
      <div className="flex gap-x-3 items-center">
        <span className="cursor-pointer hover:text-primary">
          <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-20 -right-5 bg-primary text-white w-12 h-12 rounded-full border-[6px] border-light dark:border-dark flex justify-center items-center cursor-pointer"
      >
        <BsCaretRightFill
          size={20}
          className={`${isOpen && "rotate-180"} duration-700`}
        />
      </div>
      <ul className="flex flex-col gap-y-5 mt-24">
        {adminSidebarLinks.map(({ name, icon, path }, i) => (
          <li key={i}>
            <Link href={path}>
              <div
                className={`${
                  pathname === path && "bg-primary text-white"
                } rounded-lg flex gap-x-5 py-2 cursor-pointer hover:bg-primary hover:text-white px-2 duration-300`}
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
        <li onClick={handleDarkMode} className="absolute bottom-5">
          {isDarkMode ? (
            <div>
              <div className="rounded-lg flex gap-x-5 py-2 cursor-pointer hover:text-primary px-2">
                <span>
                  <BsFillSunFill size={25} />
                </span>
                <span
                  className={`${
                    !isOpen &&
                    "-translate-x-5 opacity-0 pointer-events-none duration-300"
                  }`}
                >
                  Light Mode
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="rounded-lg flex gap-x-5 py-2 cursor-pointer hover:text-primary px-2">
                <span>
                  <BsMoonStarsFill size={25} />
                </span>
                <span
                  className={`${
                    !isOpen &&
                    "-translate-x-5 opacity-0 pointer-events-none duration-300"
                  }`}
                >
                  Dark Mode
                </span>
              </div>
            </div>
          )}
        </li>
      </ul>
    </aside>
  );
}
