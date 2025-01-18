import React from 'react'
import '@/styles/base.scss'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '@/app/(frontend)/components/HeroSection'
import ServicesSection from '@/app/(frontend)/components/ServicesSection'
import WhySection from '@/app/(frontend)/components/WhySection'
import ContactUs from '@/app/(frontend)/components/ContactUs'
import Image from 'next/image'

// Initialize Payload CMS
const payload = await getPayload({ config })

const LandingPage = async () => {
  let homeData

  try {
    // Fetch fresh data
    const result = await payload.findGlobal({
      slug: 'home',
      depth: 1,
      locale: 'en',
      fallbackLocale: false,
      overrideAccess: false,
      showHiddenFields: true,
    })

    homeData = result
  } catch (error) {
    console.error('Failed to fetch home data:', error)
    homeData = {
      hero: {
        title: 'Error',
        subtitle: '',
        content: 'Unable to load content.',
        image: null,
        advantages: [],
      },
      services: {
        title: '',
        subtitle: '',
        ourServices: [],
      },
      why: {
        why_title: '',
        why_subtitle: '',
        why_content: '',
        why_reasones: [],
      },
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection data={homeData.hero} />

      {/* Services Section */}
      <ServicesSection data={homeData.services} />

      {/* Why Us Section */}
      <WhySection data={homeData.why} />

      <ContactUs />
    </div>
  )
}

export const dynamic = 'force-dynamic' // Disable caching in the App Router

export default LandingPage
