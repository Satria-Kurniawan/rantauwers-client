'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { FaChevronRight } from "react-icons/fa"

export default function Header() {
    const pathname = usePathname()
    const [isPageScrolled, setIsPageScrolled] = useState(false)

    useEffect(() => {
        const onPageScroll = () => {
            if (window.scrollY > 50) {
                setIsPageScrolled(true)
            } else {
                setIsPageScrolled(false)
            }
        }

        window.addEventListener('scroll', onPageScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onPageScroll)
        }
    }, [isPageScrolled])

    if (pathname === '/') {
        return null
    }

    return <header className={`py-7 sticky top-[3.9rem] z-20 ${isPageScrolled && 'bg-white'}`}>
        <div className="container mx-auto px-10">
            <div className="flex gap-x-3 items-center">
                <span><Link href={'/'}>Home</Link></span>
                <span><FaChevronRight /></span>
                <span className="capitalize font-semibold">{pathname.split('/')[1]}</span>
            </div>
            {!isPageScrolled && <hr className="mt-3" />}
        </div>
    </header>
}