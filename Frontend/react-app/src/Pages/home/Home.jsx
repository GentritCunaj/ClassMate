import React from "react"
import Hero from "./hero/Hero"
import Testimonal from "./testimonal/Testimonal"
import AboutCard from "../about/AboutCard"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"

const Home = () => {
  return (
    <>
    <Header/>
      <Hero />
      <AboutCard/>
      <Testimonal />
    <Footer/>
    </>
  )
}

export default Home
