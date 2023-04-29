import './globals.css'
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
      <body>{children}</body>
    </html>
  )
}
