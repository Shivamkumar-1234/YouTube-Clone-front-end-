

import React, { useRef } from "react";
import "./Carousel.css"; 
import { useState } from "react";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [active,setActive]=useState(false)
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const activeLink=()=>{
    setActive(true)
  }

  return (
    <div className="carousel-container">
      <span onClick={scrollLeft} style={{cursor:'pointer',marginTop:'5px'}}>
        <span class="material-symbols-outlined">arrow_back_ios</span>
      </span>
      <div className="interests-carousel" ref={carouselRef}>
        <div className="interest-item interest-short-link" >
          Music
        </div>
        <div className={active?"int-active":"int-not-active"} onClick={()=>activeLink()}>Gaming</div>
        <div className="interest-item ">News</div>
        <div className="interest-item ">Movies</div>
        <div className="interest-item ">Technology</div>
        <div className="interest-item ">Live</div>
        <div className="interest-item ">Sports</div>
        <div className="interest-item ">Comedy</div>
        <div className="interest-item ">Education</div>
        <div className="interest-item ">Podcasts</div>
        <div className="interest-item ">Technology</div>
        <div className="interest-item ">Live</div>
        <div className="interest-item ">Sports</div>
        <div className="interest-item ">Comedy</div>
        <div className="interest-item ">Education</div>
        <div className="interest-item ">Podcasts</div>
        <div className="interest-item ">Technology</div>
        <div className="interest-item ">Live</div>
        <div className="interest-item ">Sports</div>
        <div className="interest-item ">Comedy</div>
        <div className="interest-item ">Education</div>
        <div className="interest-item ">Podcasts</div>
        <div className="interest-item ">Technology</div>
        <div className="interest-item ">Live</div>
        <div className="interest-item ">Sports</div>
        <div className="interest-item ">Comedy</div>
        <div className="interest-item ">Education</div>
        <div className="interest-item ">Podcasts</div>
        
      </div>
      <span onClick={scrollRight}>
        <span class="material-symbols-outlined" style={{cursor:'pointer',width:'50px',marginTop:'5px'}}>arrow_forward_ios</span>
      </span>
    </div>
  );
};

export default Carousel;
