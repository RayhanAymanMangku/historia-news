"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages }) => {
    const router = useRouter()
    const [inputPage, setInputPage] = useState(currentPage.toString())

    useEffect(() => {
        setInputPage(currentPage.toString())
    }, [currentPage])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "")
        setInputPage(value)
    }



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const pageNum = Number.parseInt(inputPage, 10)

        if (pageNum >= 1 && pageNum <= totalPages) {
            router.push(`?page=${pageNum}`)
        } else {
            setInputPage(currentPage.toString())
        }
    }

    return (
        <nav className="flex justify-center items-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPage === 1}
                asChild={currentPage !== 1}

            >
                {currentPage !== 1 ? (
                    <Link href={`?page=${currentPage - 1}`}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                ) : (
                    <span>
                        <ChevronLeft className="h-4 w-4" />
                    </span>
                )}
            </Button>

            <form onSubmit={handleSubmit} className="flex items-center">
                <div className="flex items-center gap-1 px-2">
                    <Input
                        type="text"
                        value={inputPage}
                        onChange={handleInputChange}
                        className="h-9 w-16 text-center"
                        aria-label="Go to page"
                    />
                </div>
            </form>

            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPage === totalPages}
                asChild={currentPage !== totalPages}
            >
                {currentPage !== totalPages ? (
                    <Link href={`?page=${currentPage + 1}`}>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <span>
                        <ChevronRight className="h-4 w-4" />
                    </span>
                )}
            </Button>
        </nav>
    )
}

export default PaginationControls