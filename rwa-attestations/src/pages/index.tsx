import MainNav from "@/components/main-nav";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between mx-auto max-w-7xl py-4 sm:py-12 ${inter.className}`}
    >
      <header>
        <MainNav />
      </header>
    </main>
  );
}
