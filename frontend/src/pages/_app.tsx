import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const inter = Inter({ subsets: ['latin'] })

const activeChain = 1

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://sepolia.easscan.org/graphql',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
        clientId="ce562fbed52fdd499005cfc9e2c020e4"
        activeChain={activeChain}
      >
        <Layout>
          <Component {...pageProps} className={inter.className} />
        </Layout>
      </ThirdwebProvider>
    </ApolloProvider>
  )
}
