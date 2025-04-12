'use client'

import PropertySearch from '@/components/search/PropertySearch'
import FeaturedListing from '@/components/search/FeaturedListing'
import Footer from '@/components/ui/footer'
import { LayoutGroup, motion } from 'motion/react'
import Link from 'next/link'
import GooeyNav from '@/styles/GooeyNav'

import { TextRotate } from '@/components/ui/text-rotate'
import PropertyListing from '@/components/search/PropertyListing'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Testimonials from '@/components/ui/Testimonial'
import { Radio } from 'lucide-react'

export default function Home() {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('/api/test').then(res => setData(res.data))
  }, [])
  const items = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <>
      <section className='py-8'>
        <div className='text-2xl sm:text-3xl poppins-bold md:text-5xl flex flex-col gap-4 items-center justify-center font-overusedGrotesk dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24'>
          <LayoutGroup>
            <motion.div className='flex whitespace-pre' layout>
              <motion.span
                className='pt-0.5 sm:pt-1 md:pt-2'
                layout
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              >
                Find Your Perfect{' '}
              </motion.span>
              <TextRotate
                texts={[
                  'Property',
                  'Home',
                  'Hostel',
                  'Site',
                  'Office',
                  'Apartment',
                  'Villa',
                ]}
                mainClassName='text-white px-2 sm:px-2 md:px-3 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg'
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.div>
            <p className='text-center text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
              Discover thousands of listings across the country with zero
              brokerage fees
            </p>
          </LayoutGroup>

          <Link href='/upload-property' className='flex items-center gap-2 p-2'>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              layout
              layoutId='cta-button'
              className='text-lg shadow-2xl px-8 py-3 mt-2 rounded-3xl  text-white bg-[#ff5941]'
            >
              Upload Property
            </motion.button>
          </Link>
        </div>
      </section>
      <div className='container mx-auto px-4 -mt-8 mb-16 '>
        <GooeyNav />
      </div>
      {/* <div
        style={{
          height: '80px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ff5941',
          //   overflow: 'hidden',
          //   textAlign: 'center',
          //   justifyContent: 'center',
          //   justifyContent: 'center',
          //   backgroundColor: '#ff5941',
          textUnderlineOffset: '10px',
          //   textJustify: 'inter-word',
        }}
      >
        <GooeyNav
          items={items.map(item => ({
            ...item,
            // Add style properties to each item
            style: {
              color: 'black',
              fontWeight: 'bold',
              // Add any other text styling you want
            },
          }))}
          animationTime={600}
          pCount={15}
          minDistance={20}
          maxDistance={42}
          maxRotate={75}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          timeVariance={300}
        />
      </div> */}
      <div className='container mx-auto px-4 -mt-8 mb-16'>
        <PropertySearch />
      </div>
      <section className='container mx-auto px-4 mb-16'>
        <h2 className='text-2xl poppins-semibold mb-6'>Featured Properties</h2>
      </section>
      <section className='container mx-auto px-4 mb-16'>
        <h2 className='text-2xl poppins-semibold mb-6'>
          Explore All Properties
        </h2>
        <PropertyListing />
      </section>
      <div className='container mx-auto px-4'>
        <Testimonials />
      </div>
      <div className='container mx-auto px-4'>
        <Footer />
      </div>
    </>
  )
}
