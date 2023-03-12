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
      window.scrollY > 30 ? setIsPageScrolled(true) : setIsPageScrolled(false)
    })

    return () => document.removeEventListener('scroll', onPageScroll)
  }, [isPageScrolled])


  return (
    <nav className={`w-full py-3 ${isPageScrolled ? 'backdrop-blur-md text-black' : 'text-white'} sticky top-0 z-20`}>
      <div className="container mx-auto md:px-10 px-5 flex items-center justify-between">
        <h1 className={`${zendots.className} text-xl uppercase text-stroke text-black -z-10`}>
          Rantauwers
        </h1>
        <ul className={`md:inline-flex hidden items-center gap-x-3 ${!isHomePage && 'text-black'}`}>
          <li>Gabung Jadi Mitra</li>
          <li>Contact</li>
          <li>About Us</li>
          <Button text={"Masuk"} className={`border ${isHomePage ? !isPageScrolled ? 'border-white' : 'border-black text-black' : 'border-primary text-primary'}`} />
          <Button text={"Daftar"} isPrimary={true} className="text-white" />
        </ul>

        <div className='md:hidden block'>

          <svg onClick={() => setIsNavOpen(!isNavOpen)} className={`w-16 ham hamRotate ham8 z-[30] ${isNavOpen && 'active'}`} viewBox="0 0 100 100" width="80">
            <path className="line top" d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
            <path className="line middle" d="m 30,50 h 40" />
            <path className="line bottom" d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
          </svg>

          <div className={`${isNavOpen ? 'h-[60vh] w-[70vw] bg-white rounded-bl-3xl' : 'h-[0vh] w-[0vw] opacity-0 pointer-event-none overflow-hidden'} absolute top-0 right-0 duration-700 -z-10`}>
            <ul className={`${!isNavOpen && 'opacity-0'} h-[60vh] flex flex-col gap-3 justify-center items-center text-black transition delay-300 duration-700`}>
              <li>Gabung Jadi Mitra</li>
              <li>Contact</li>
              <li>About Us</li>
              <div className='inline-flex gap-x-3'>
                <Button text={"Masuk"} className={`border border-primary text-primary`} />
                <Button text={"Daftar"} isPrimary={true} className="text-white" />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
