'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('svg')
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <nav className='header fixed min-w-screen min-h-16 lg:min-h-20 bg-[#ffdf4d] flex justify-between items-center lg:px-6 px-4 z-50'>
      <Link href='/' className='playfair-display text-3xl'>
        XeroBrokerage
      </Link>

      <div
        className='lg:hidden md:hidden flex cursor-pointer'
        onClick={toggleMenu}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='35px'
          viewBox='0 -960 960 960'
          width='48px'
          fill='#000000'
        >
          <path d='M99-205v-92h763v92H99Zm0-229v-91h763v91H99Zm0-229v-92h763v92H99Z' />
        </svg>
      </div>

      <div className='lg:flex md:flex hidden items-center lg:gap-4 md:gap-2 poppins-semibold'>
        <NavLinks />
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className='absolute top-[72px] right-2 w-56 bg-[#FAEDCD] flex flex-col gap-4 p-4 poppins-semibold lg:hidden md:hidden z-50 shadow-md'
        >
          <NavLinks onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  )
}

function NavLinks({ onClick }) {
  return (
    <>
      <Link
        href='/contact-us'
        onClick={onClick}
        className='flex items-center gap-2 p-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20px'
          viewBox='0 -960 960 960'
          width='20px'
          fill='#00000'
        >
          <path d='M490.67-472.67v-334q0-14.16 9.58-23.75Q509.83-840 524-840h282.67q14.16 0 23.75 9.58 9.58 9.59 9.58 23.75V-612q0 14.17-9.58 23.75-9.59 9.58-23.75 9.58H600l-109.33 106Zm66.66-172.66h216v-128h-216v128Zm0 0v-128 128ZM796-120q-119 0-240-55.5T333-333Q231-435 175.5-556T120-796q0-18.86 12.57-31.43T164-840h147.33q14 0 24.34 9.83Q346-820.33 349.33-806l26.62 130.43q2.05 14.9-.62 26.24-2.66 11.33-10.82 19.48L265.67-530q24 41.67 52.5 78.5T381-381.33q35 35.66 73.67 65.5Q493.33-286 536-262.67l94.67-96.66q9.66-10.34 23.26-14.5 13.61-4.17 26.74-2.17L806-349.33q14.67 4 24.33 15.53Q840-322.27 840-308v144q0 18.86-12.57 31.43T796-120ZM233-592l76-76.67-21-104.66H187q3 41.66 13.67 86Q211.33-643 233-592Zm365.33 361.33q40.34 18.34 85.84 29.67 45.5 11.33 89.16 13.67V-288l-100-20.33-75 77.66ZM233-592Zm365.33 361.33Z' />
        </svg>
        Contact Us
      </Link>
      <Link
        href='/Auth/login'
        onClick={onClick}
        className='flex items-center gap-2 p-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20px'
          viewBox='0 -960 960 960'
          width='20px'
          fill='#000000'
        >
          <path d='M480-144v-72h264v-528H480v-72h264q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H480Zm-72-168-51-51 81-81H144v-72h294l-81-81 51-51 168 168-168 168Z' />
        </svg>
        Login
      </Link>
    </>
  )
}
