import React from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/cards.css'
const Cards = () => {
  const {teachers,students,admins,loading} = useSelector((store) => store.data);
  return (
    <section class="page-contain">
     <div className="data-card">
        <h3>{teachers.length}</h3>
        <h4>Teachers</h4>
        <p>Etiam porta sem malesuada.</p>
      </div>
      <div className="data-card">
        <h3>{students.length}</h3>
        <h4>Students</h4>
        <p>Etiam porta sem malesuada.</p>
      </div>
      <div className="data-card">
        <h3>{admins.length}</h3>
        <h4>Admins</h4>
        <p>Etiam porta sem malesuada.</p>
      </div>
  </section>
   
  );
}

export default Cards;
