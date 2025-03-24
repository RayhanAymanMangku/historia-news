import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchComponent() {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border focus-visible:ring-offset-0"
            />
        </div>
    )
}

