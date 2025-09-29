import React from 'react'
import Hero from '../components/Hero'
import TrustedCompanies from '../components/TrustedCompanies'
import AboutSection from '../components/About'
import FAQSection from '../components/FAQSection'

function Home() {
  return (
    <div className=' flex flex-col items-center w-full '>

      <Hero />
      <TrustedCompanies />
      <AboutSection/>
      <FAQSection/>

    </div>
  )
}

export default Home
