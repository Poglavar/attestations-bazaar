import MainNav from '@/components/main-nav'
import Logo from '@/components/ui/logo'
import { BackgroundGradient } from './ui/background-gradient'

export default function Layout({ children }) {
  return (
    <div className="background">
      <main
        className={` mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between`}
      >
        <Logo />
        <MainNav />
        <BackgroundGradient className="rx mx-auto flex grid min-h-screen w-screen max-w-7xl rounded-[22px]  shadow-2xl bg-ebony-950 overflow-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </BackgroundGradient>
      </main>
    </div>
  )
}
