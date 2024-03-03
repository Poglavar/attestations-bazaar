import MainNav from '@/components/main-nav'
import Logo from '@/components/ui/logo'
import { BackgroundGradient } from './ui/background-gradient'

export default function Layout({ children }: { children: any }) {
  return (
    <div className="background">
      <div className="header-banner">Built with ❤️ at EthDenver 2024. Reach out to us  on <a href="https://t.me/+U5GaRowJBQwyMTlk">telegram</a>. </div>
      <main
        className={`mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between pb-6 sm:pb-24 pt-16`}
      >
        <Logo />
        <MainNav />
        <hr />
        <BackgroundGradient className="mx-auto flex min-h-screen w-screen max-w-7xl overflow-hidden  rounded-[22px] bg-ebony-950 p-4 shadow-2xl sm:p-6 lg:p-8">
          {children}
        </BackgroundGradient>
      </main>
    </div>
  )
}
