import MainNav from '@/components/main-nav'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main
            className={`mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between py-4 sm:py-12 ${inter.className}`}
        >
            <header>
                <MainNav />
            </header>
        </main>
    )
}
