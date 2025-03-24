import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <>
            <footer className="border-t flex flex-col bottom-0 w-full items-center py-6 space-y-4 px-28 text-black">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col space-y-6 items-center">
                        <Image
                            width={130}
                            height={50}
                            className="h-full w-full object-contain"
                            src="/images/logo.png"
                            alt="logo"
                        />
                    </div>

                    <div className="flex flex-row space-x-12 justify-end">
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-bold">Company</h3>
                            <Link href="#" className="text-black hover:text-black" prefetch={false}>
                                About us
                            </Link>
                            <Link href="#" className="text-black hover:text-black" prefetch={false}>
                                Our team
                            </Link>
                            <Link href="#" className="text-black hover:text-black" prefetch={false}>
                                Careers
                            </Link>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="font-bold">Help</h3>
                            <Link href="#" className="text-black hover:text-black" prefetch={false}>
                                Support
                            </Link>
                            <Link href="#" className="text-black hover:text-black" prefetch={false}>
                                FAQs
                            </Link>
                            <Link href="#" className="text-black hover:text-black" prefetch={false}>
                                Contact us
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="py-8 w-full px-30">
                <p className="text-sm text-black text-center">{`\u00A9 2025 Historia. All rights reserved.`}</p>
            </div>
        </>
    )
}