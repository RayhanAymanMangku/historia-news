"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BiCategoryAlt } from "react-icons/bi";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = [
        "Business",
        "Entertainment",
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology"
    ];

    const NavLinks = () => (
        <ul className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <li className={`${pathname === "/" ? "text-slate-300" : ""} hover:text-slate-300 transition-all duration-300`}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                </Link>
            </li>
            <li className={`${pathname === "/news/top" ? "text-slate-300" : ""} hover:text-slate-300 transition-all duration-300`}>
                <Link href="/news/top" onClick={() => setIsMenuOpen(false)}>
                    Top Headlines
                </Link>
            </li>
            <li className={`${pathname.startsWith("/news/") ? "text-slate-300" : ""} hover:text-slate-300 transition-all duration-300`}>
                <CategoriesSwitcher />
            </li>
        </ul>
    );

    const CategoriesSwitcher = () => {
        const handleCategorySelect = (category: string) => {
            try {
                router.push(`/news/${category.toLowerCase()}`);
                setIsMenuOpen(false);
            } catch (error) {
                console.error('Error navigating to category:', error);
            }
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full px-4">
                        <BiCategoryAlt className="h-4 w-4" />
                        Categories
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {categories.map((category, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => handleCategorySelect(category)}
                            className="cursor-pointer"
                        >
                            {category}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <nav className="mx-auto flex max-h-12 border-b py-12 sticky top-0 bg-white z-50 w-full px-4 md:px-28 items-center justify-between">
            {/* Logo */}
            <div className="flex gap-[30px]">
                <div className="shrink-0 overflow-hidden">
                    <Link href="/">
                        <Image
                            width={130}
                            height={50}
                            className="h-full w-full object-contain"
                            src="/images/logo.png"
                            alt="logo"
                            priority
                        />
                    </Link>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
                <NavLinks />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden gap-2 items-center">
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetTitle></SheetTitle>
                    <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                        <div className="flex flex-col gap-8 mt-8">
                            <NavLinks />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;