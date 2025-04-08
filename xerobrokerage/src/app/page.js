"use client";

import PropertySearch from "@/components/search/PropertySearch";
import FeaturedListing from "@/components/search/FeaturedListing";
import { LayoutGroup, motion } from "motion/react";

import { TextRotate } from "@/components/ui/text-rotate";

export default function Home() {
  return (
    <>
      {/* <div className="text-4xl font-black ">Homepage...</div> */}

      <section className="py-8">
        <div className="text-4xl sm:text-3xl poppins-bold md:text-5xl flex flex-col gap-4 items-center justify-center font-overusedGrotesk dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
          <LayoutGroup>
            <motion.p className="flex whitespace-pre" layout>
              <motion.span
                className="pt-0.5 sm:pt-1 md:pt-2"
                layout
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                Find Your Perfect{" "}
              </motion.span>
              <TextRotate
                texts={["Property", "Home", "Hostel", "Site"]}
                mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.p>
          </LayoutGroup>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of listings across the country with zero
            brokerage fees
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 mb-16">
        <PropertySearch />
      </div>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Properties</h2>
        {/* <FeaturedListing properties={properties} /> */}
      </section>
    </>
  );
}
