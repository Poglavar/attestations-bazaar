import MainNav from '@/components/main-nav'
import Logo from '@/components/ui/logo'

export default function Layout({ children }) {
  return (
    <main
      className="app-shell"
    >
      <Logo />
      <MainNav />
      <div className="app-panel">
        {children}
      </div>
    </main>
  )
}
