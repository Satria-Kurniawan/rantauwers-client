"use client";

import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zen_Dots } from "next/font/google";
import { FaUserCircle } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import Button from "./Button";
import Dropdown from "./Dropdown";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function Nav({ session }) {
  console.log(session);
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    pathname === "/" ? setIsHomePage(true) : setIsHomePage(false);
  }, [pathname]);

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 50) {
        setIsPageScrolled(true);
      } else {
        setIsPageScrolled(false);
      }
    };

    window.addEventListener("scroll", onPageScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, [isPageScrolled]);

  return (
    <nav
      className={`w-full py-3 ${
        isPageScrolled ? "bg-white text-black border-b" : "text-white"
      } sticky top-0 z-30`}
    >
      <div className="container mx-auto md:px-10 px-5 flex items-center justify-between">
        <Link href={"/"}>
          <div
            className={`${zendots.className} text-xl uppercase text-stroke text-black -z-10`}
          >
            Rantauwers
          </div>
        </Link>
        <ul
          className={`md:inline-flex hidden items-center gap-x-3 ${
            !isHomePage && "text-black"
          }`}
        >
          <li>Gabung Jadi Mitra</li>
          <li>Contact</li>
          <li>About Us</li>
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
                    <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                      <span>
                        <FaUserCircle size={25} />
                      </span>
                      <span>Profile</span>
                    </li>
                    <li className="px-3 py-2 rounded-md flex gap-x-3 items-center hover:bg-white hover:text-black cursor-pointer">
                      <span>
                        <MdHelp size={25} />
                      </span>
                      <span>Bantuan</span>
                    </li>
                    <li
                      onClick={() => signOut()}
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
          <svg
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={`w-16 ham hamRotate ham8 z-[30] ${
              isNavOpen && "active"
            }`}
            viewBox="0 0 100 100"
            width="80"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            />
          </svg>

          <div
            className={`${
              isNavOpen
                ? "h-[60vh] w-[70vw] bg-white rounded-bl-3xl"
                : "h-[0vh] w-[0vw] opacity-0 pointer-event-none overflow-hidden"
            } absolute top-0 right-0 duration-700 -z-10`}
          >
            <ul
              className={`${
                !isNavOpen && "opacity-0"
              } h-[60vh] flex flex-col gap-3 justify-center items-center text-black transition delay-300 duration-700`}
            >
              <li>Gabung Jadi Mitra</li>
              <li>Contact</li>
              <li>About Us</li>
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
