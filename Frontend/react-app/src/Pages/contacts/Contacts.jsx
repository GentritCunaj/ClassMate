import React from 'react';
import Back from '../common/back/Back';
import ContactsCard from './ContactsCard';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import "../contacts/Contacts.css"

const Contact = () => {
  return (
    <>
      <Header />
      <Back title='Contact' />
      <ContactsCard />
      <Footer />
    </>
  );
};

export default Contact;
