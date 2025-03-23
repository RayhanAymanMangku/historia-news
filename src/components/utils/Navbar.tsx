"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BiCategoryAlt } from "react-icons/bi";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [language, setLanguage] = useState<"id" | "en">("id");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Categories based on language
    const categories = {
        id: ["Bisnis", "Hiburan", "Umum", "Kesehatan", "Sains", "Olahraga", "Teknologi"],
        en: ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"],
    };

    // Set initial language from localStorage
    useEffect(() => {
        const preferredLanguage = localStorage.getItem('preferredLanguage') as "id" | "en" || "id";
        setLanguage(preferredLanguage);
    }, []);

    // Handle language change
    const toggleLanguage = (lang: "id" | "en") => {
        setLanguage(lang);
        localStorage.setItem('preferredLanguage', lang);
    };

    // Navigation links component
    const NavLinks = () => (
        <ul className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <li className={`${pathname === "/" ? "text-slate-300" : ""} hover:text-slate-300 transition-all duration-300`}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    {language === "id" ? "Beranda" : "Home"}
                </Link>
            </li>
            <li className={`${pathname === "/news/top" ? "text-slate-300" : ""} hover:text-slate-300 transition-all duration-300`}>
                <Link href="/news/top" onClick={() => setIsMenuOpen(false)}>
                    {language === "id" ? "Berita Utama" : "Top Headlines"}
                </Link>
            </li>
            <li className={`${pathname.startsWith("/news/") ? "text-slate-300" : ""} hover:text-slate-300 transition-all duration-300`}>
                <CategoriesSwitcher />
            </li>
        </ul>
    );

    // Language switcher component
    const LanguageSwitcher = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full px-4">
                    <Globe className="h-4 w-4" />
                    <span>{language === "id" ? "Indonesia" : "English"}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleLanguage("id")} className={language === "id" ? "bg-muted" : ""}>
                    Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLanguage("en")} className={language === "en" ? "bg-muted" : ""}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    // Categories switcher component
    const CategoriesSwitcher = () => {
        const handleCategorySelect = (category: string) => {
            try {
                router.push(`/news/${category.toLowerCase()}`);
                setIsMenuOpen(false); // Close mobile menu on category select
            } catch (error) {
                console.error('Error navigating to category:', error);
            }
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full px-4">
                        <BiCategoryAlt className="h-4 w-4" />
                        {language === "id" ? "Kategori" : "Categories"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {categories[language].map((category, index) => (
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
        <nav className="mx-auto flex max-h-12 border-b py-12 sticky top-0 bg-white z-50 w-full px-4 md:px-30 items-center justify-between">
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

            {/* Desktop Language Switcher */}
            <div className="hidden md:flex gap-3">
                <LanguageSwitcher />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden gap-2 items-center">
                <LanguageSwitcher />

                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
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