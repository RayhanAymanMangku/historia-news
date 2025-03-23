"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="mx-auto flex max-h-12 py-12 sticky top-0 bg-white z-50 w-full px-30 items-center justify-between">
            <div className="flex gap-[30px]">
                <div className="shrink-0 overflow-hidden">
                    <Image width={130} height={50} className="h-full w-full object-contain" src="/images/logo.png" alt="logo" />
                </div>
            </div>
            <div className="flex gap-8">
                <ul className="flex gap-4">
                    <li className={`${pathname === '/' ? 'text-slate-300 ' : ''} px-4 py-2 rounded hover:text-slate-300 transition-all duration-300`}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={`${pathname === '/news/top' ? 'text-slate-300 ' : ''} px-4 py-2 rounded hover:text-slate-300 transition-all duration-300`}>
                        <Link href="/news/top">Top Headlines</Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-3">
                <a href="#">
                    <div className="w-[145px] rounded-full border px-[22px] py-3">
                        <p className="w-full text-nowrap text-center text-base font-semibold">Upgrade Pro</p>
                    </div>
                </a>
            </div>
        </nav>

    )
}

export default Navbar