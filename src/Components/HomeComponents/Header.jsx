import React from 'react'
import slider1 from './../../assets/images/slider-image-1.jpeg'
import slider2 from './../../assets/images/slider-image-2.jpeg'
import slider3 from './../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

import blog1 from './../../assets/blog-img-1.jpeg'
import blog2 from './../../assets/blog-img-2.jpeg'

export default function Header() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
      };

  return (
<header className='relative'>
<div className="container">

   <div className=" flex flex-col md:flex-row">
   <div className="md:w-2/3 w-full ">
   <Slider {...settings}>
      <div>
      <img className='w-full h-[480px] object-cover' src={slider1} alt="slider-image-1" />
      </div>
      <div>
      <img  className='w-full h-[480px] object-cover' src={slider2} alt="slider-image-2" />
      </div>
      <div>
      <img  className='w-full h-[480px] object-cover' src={slider3} alt="slider-image-3" />
      </div>
    </Slider>

</div>

<div className="md:w-1/3 mt-8 md:mt-0 w-full flex flex-row md:flex-col ">
    <img className='w-1/2 md:w-full h-[240px] object-cover' src={blog1} alt="blog-img-1" />
    <img className='w-1/2 md:w-full h-[240px] object-cover' src={blog2} alt="blog-img-2" />

</div>
   </div>
</div>
</header>
  )
}
