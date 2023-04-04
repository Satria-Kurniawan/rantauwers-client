"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isPageScrolled, setIsPageScrolled] = useState(false);

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 0) {
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

  if (pathname === "/") return null;

  return (
    <header
      className={`py-7 sticky top-[3rem] z-20 ${
        isPageScrolled && "bg-white dark:bg-dark2"
      }`}
    >
      <div className="container mx-auto px-10">
        <div className="flex gap-x-3 items-center">
          <div>
            <Link href={"/"}>Home</Link>
          </div>
          <span>
            <FaChevronRight />
          </span>
          <span className="capitalize font-semibold">
            {pathname.split("/")[1]}
          </span>
        </div>
        {!isPageScrolled && <hr className="mt-3" />}
      </div>
    </header>
  );
}