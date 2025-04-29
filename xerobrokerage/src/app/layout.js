import Navbar from '@/components/ui/Navbar'
import './globals.css'

export const metadata = {
  title: 'XeroBrokerage | No Commission Property Platform',
  description: 'Find your perfect home with zero brokerage fees',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-[#fff6cc] '>
        <Navbar />
        <main className='max-h-[90vh] max-w-screen relative top-[8vh]'>
          {children}
        </main>

      </body>
    </html>
  )
}
