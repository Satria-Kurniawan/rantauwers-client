"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zen_Dots } from "next/font/google";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdHelp } from "react-icons/md";
import { RiChatHistoryFill, RiLogoutCircleRFill } from "react-icons/ri";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Hamburger from "./Hamburger";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function Nav({ session }) {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    pathname === "/" ? setIsHomePage(true) : setIsHomePage(false);
  }, [pathname]);

  useEffect(() => {
    const onPageScroll = () => {
      setIsPageScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onPageScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, [isPageScrolled]);

  useLayoutEffect(() => {
    setIsPageScrolled(false);
    if (pathname !== "/") return;

    const parallaxElement = document.getElementById("parallax");

    const handleScroll = () => {
      setIsPageScrolled(parallaxElement.scrollTop > 0);
    };

    if (parallaxElement) {
      parallaxElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (parallaxElement) {
        parallaxElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

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
    <nav
      className={`w-full py-3 ${
        isPageScrolled
          ? "bg-white dark:bg-dark2 text-black dark:text-white border-b"
          : "text-white"
      } sticky top-0 z-30`}
    >
      <div className="container mx-auto md:px-10 px-5 flex items-center justify-between">
        <Link href={"/"}>
          <div
            className={`${zendots.className} text-xl uppercase text-stroke-white text-black -z-10`}
          >
            Rantauwers
          </div>
        </Link>
        <ul
          className={`md:inline-flex hidden items-center gap-x-5 ${
            !isHomePage && "text-black dark:text-white"
          }`}
        >
          <li onClick={handleDarkMode} className="cursor-pointer">
            {isDarkMode ? (
              <BsFillSunFill size={20} />
            ) : (
              <BsMoonStarsFill size={20} />
            )}
          </li>
          {(!session || !session.user.role === "admin") && (
            <li className="cursor-pointer">Gabung Jadi Mitra</li>
          )}
          <li className="cursor-pointer">Contact</li>
          <li className="cursor-pointer">About Us</li>
          {session ? (
            <>
              <Dropdown>
                <Dropdown.Trigger>
                  {session.user.avatar ? (
                    ""
                  ) : (
                    <div className="flex gap-x-3">
                      <span>{session.user.name}</span>
                      <FaUserCircle size={25} />
                    </div>
                  )}
                </Dropdown.Trigger>
                <Dropdown.Content className="min-w-[12rem] mt-5">
                  <ul>
                    <Link href={"/user/my-profile"}>
                      <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                        <span>
                          <FaUserCircle size={25} />
                        </span>
                        <span>Profile</span>
                      </li>
                    </Link>
                    {session.user.role === "user" ? (
                      <Link href={"/user/booking-history"}>
                        <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                          <span>
                            <RiChatHistoryFill size={25} />
                          </span>
                          <span>Riwayat</span>
                        </li>
                      </Link>
                    ) : (
                      <Link href={"/admin/dashboard"}>
                        <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                          <span>
                            <MdDashboard size={25} />
                          </span>
                          <span>Dashboard</span>
                        </li>
                      </Link>
                    )}
                    <Link href={"/"}>
                      <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                        <span>
                          <MdHelp size={25} />
                        </span>
                        <span>Bantuan</span>
                      </li>
                    </Link>
                    <li
                      onClick={() => signOut({ callbackUrl: "/" })}
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
            </>
          ) : (
            <>
              <div onClick={() => signIn()}>
                <Button
                  text={"Masuk"}
                  className={`border ${
                    isHomePage
                      ? !isPageScrolled
                        ? "border-white"
                        : "border-primary text-primary"
                      : "border-primary text-primary"
                  }`}
                />
              </div>
              <Link href={"/accounts/sign-up"}>
                <Button
                  text={"Daftar"}
                  isPrimary={true}
                  className="text-white"
                />
              </Link>
            </>
          )}
        </ul>

        <div className="md:hidden block">
          <Hamburger
            onClick={() => setIsNavOpen(!isNavOpen)}
            isOpen={isNavOpen}
          />
          <div
            className={`${
              isNavOpen
                ? "h-screen w-full backdrop-blur-lg"
                : "h-[0vh] w-[0vw] opacity-0 pointer-event-none overflow-hidden"
            } absolute top-0 right-0 duration-700 -z-10`}
          >
            <ul
              className={`${
                !isNavOpen && "opacity-0"
              } h-screen flex flex-col gap-y-5 justify-center items-center text-black dark:text-white transition delay-300 duration-700`}
            >
              <li onClick={handleDarkMode} className="cursor-pointer">
                {isDarkMode ? (
                  <BsFillSunFill size={20} />
                ) : (
                  <BsMoonStarsFill size={20} />
                )}
              </li>
              <li className="cursor-pointer">Gabung Jadi Mitra</li>
              <li className="cursor-pointer">Contact</li>
              <li className="cursor-pointer">About Us</li>
              <div className="inline-flex gap-x-3">
                <Link href={"/accounts/sign-in"}>
                  <Button
                    text={"Masuk"}
                    className={`border border-primary text-primary`}
                  />
                </Link>
                <Link href={"/accounts/sign-up"}>
                  <Button
                    text={"Daftar"}
                    isPrimary={true}
                    className="text-white"
                  />
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
