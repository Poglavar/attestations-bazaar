import '@/styles/globals.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="ethereum" clientId="your-client-id">
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
