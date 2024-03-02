import MainNav from '@/components/main-nav'
import Logo from '@/components/ui/logo'
import { BackgroundGradient } from './ui/background-gradient'
import { LampContainer } from './ui/lamp'
import { motion } from 'framer-motion'

export default function Layout({ children }) {
  return (
    <div className="background">
      <main
        className={` mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between pb-6 sm:pb-24`}
      >
        <Logo />
        <MainNav />
        <hr />
        <BackgroundGradient className="rx mx-auto flex grid min-h-screen w-screen max-w-7xl rounded-[22px]  shadow-2xl bg-ebony-950 overflow-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </BackgroundGradient>
{/* 
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            {children}
          </motion.h1>
        </LampContainer> */}
      </main>
    </div>
  )
}
