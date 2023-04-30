import { Providers } from '@/src/redux/Provider'
import './globals.css'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

export const metadata = {
  title: 'Movie Arena',
  description: 'Movies and Shows at one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Header/>
        <Providers>
        {children}
        </Providers>
        <Footer/>
        </body>
    </html>
  )
}
