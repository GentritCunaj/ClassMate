import React from "react"
import "./about.css"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"
import Header from "../common/header/Header"

const About = () => {
  return (
    <>
    <Header/>
      <Back title='About Us' />
      <AboutCard />
    </>
  )
}

export default About
