import Navbar from '@/components/ui/Navbar'
import './globals.css'

export const metadata = {
  title: 'XeroBrokerage | No Commission Property Platform',
  description: 'Find your perfect home with zero brokerage fees',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='min-h-screen'>{children}</main>
        {/* Footer can be added here */}
      </body>
    </html>
  )
}
