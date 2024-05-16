import React, { Component } from 'react'
import {Routes,Route,useParams} from 'react-router-dom';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import Hero from './home/hero/Hero';

function Subject() {

    const {subject} = useParams();
  return(
    <>
   <Header prop={true}/>
   
  <Footer/>
   
    </>
  )
}
export default Subject;