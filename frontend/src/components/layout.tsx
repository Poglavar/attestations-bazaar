import MainNav from '@/components/main-nav'
import Logo from '@/components/ui/logo'
import { BackgroundGradient } from './ui/background-gradient'

export default function Layout({ children }) {
  return (
    <div className="background">
      <main
        className={`mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between pb-6 sm:pb-24`}
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
