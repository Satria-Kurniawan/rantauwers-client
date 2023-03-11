'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Zen_Dots } from "next/font/google"
import Button from "./Button"

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] })

export default function Nav() {
  const pathname = usePathname()
  const [isHomePage, setIsHomePage] = useState(false)
  const [isPageScrolled, setIsPageScrolled] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    pathname === '/' ? setIsHomePage(true) : setIsHomePage(false)
  }, [pathname])

  useEffect(() => {
    const onPageScroll = document.addEventListener('scroll', () => {
      window.scrollY > 10 ? setIsPageScrolled(true) : setIsPageScrolled(false)
    })

    return () => document.removeEventListener('scroll', onPageScroll)
  }, [isPageScrolled])


  return (
    <nav className={`w-full py-3 ${isPageScrolled ? 'backdrop-blur-md text-black' : 'text-white'} sticky top-0 z-10`}>
      <div className="container mx-auto md:px-10 px-5 flex items-center justify-between">
        <h1 className={`${zendots.className} text-xl uppercase text-stroke text-black`}>
          Rantauwers
        </h1>
        <ul className={`md:inline-flex hidden items-center gap-x-3 ${!isHomePage && 'text-black'}`}>
          <li>Gabung Jadi Mitra</li>
          <li>Contact</li>
          <li>About Us</li>
          <Button text={"Masuk"} className={`border ${isHomePage ? !isPageScrolled ? 'border-white' : 'border-black text-black' : 'border-primary text-primary'}`} />
          <Button text={"Daftar"} isPrimary={true} className="text-white" />
        </ul>
      </div>
    </nav>
  )
}
