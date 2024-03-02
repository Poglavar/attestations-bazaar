import MainNav from '@/components/main-nav'
import Logo from '@/components/ui/logo'

export default function Layout({ children }: { children: any }) {
  return (
    <main
      className={`mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between`}
    >
      <Logo />
      <MainNav />
      <div className="mx-auto flex grid min-h-screen w-screen max-w-7xl rounded-lg bg-ebony-950 bg-seance-900 shadow-2xl">
        {children}
      </div>
    </main>
  )
}
