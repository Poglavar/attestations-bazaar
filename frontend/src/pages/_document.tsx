import { ThemeProvider } from '@/components/theme-provider'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head title="Dolphin Protocol" />

      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  )
}
