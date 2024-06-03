import React from "react";
import { team } from "../dummydata";

// Importing images directly
import image1 from "../../assets/img/t1.webp";
import image2 from "../../assets/img/t2.webp";
import image3 from "../../assets/img/t3.webp";
import image4 from "../../assets/img/t4.webp";
import image5 from "../../assets/img/t5.webp";
import image6 from "../../assets/img/t6.webp";
import image7 from "../../assets/img/t7.webp";
import image8 from "../../assets/img/t8.webp";

const images = [image1, image2, image3, image4, image5, image6, image7, image8]; // Array of image imports

const TeamCard = () => {
  return (
    <>
      {team.map((val, index) => (
        <div className='items shadow' key={index}>
          <div className='img'>
            {/* Using the imported images directly */}
            <img src={images[index]} alt={`${val.name}'s profile`} />
            <div className='overlay'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-tiktok icon'></i>
            </div>
          </div>
          <div className='details'>
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TeamCard;
