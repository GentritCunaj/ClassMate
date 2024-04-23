import '../assets/css/cards.css'
import '../assets/css/rooms.css'
import { React, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';

const Containers = () => {
    const { teachers, students, admins, loading, modalCreated } = useSelector((store) => store.data);

  
    const dispatch = useDispatch();
    return (
        <>
        <section class="page-contain">
         <div className="data-card">
            <h3>{teachers.length}</h3>
            <h4>Teachers</h4>
            
          </div>
          <div className="data-card">
            <h3>{students.length}</h3>
            <h4>Students</h4>
           
          </div>
          <div className="data-card">
            <h3>{admins.length}</h3>
            <h4>Admins</h4>
           
          </div>
      </section>
      </>
    );
}

export default Containers;