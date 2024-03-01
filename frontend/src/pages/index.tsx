import MainNav from '@/components/main-nav'
import NFTGrid from '@/components/nft-grid'
import Logo from '@/components/ui/logo'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between ${inter.className}`}
    >
      <Logo/>
      <MainNav />
      <div className="mx-auto flex grid min-h-screen bg-ebony-950 w-screen max-w-7xl rounded-lg bg-sky-200 shadow-2xl">
        <NFTGrid />
      </div>
    </main>
  )
}
