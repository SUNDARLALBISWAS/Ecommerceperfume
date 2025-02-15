import React from 'react'
import CarouselSlide from '../Carousal/CarouselSlide'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Videopage from '../Video/Videopage'
import Footer from '../Layout/Footer/Footer'
import FAQPage from '../FAQPage/FAQPage'


const Home = () => {
  return (
    <div>
      <CarouselSlide />
      <About />
      <Contact />
      <FAQPage/>
      <Videopage />
      <Footer />
    </div>
  )
}

export default Home