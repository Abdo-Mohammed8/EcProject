
import React from 'react'
import Slider from 'react-slick';
import ErrorMsg from '../ErrorMsg';
import Loading from '../Loading';
import useCategories from '../../hooks/useCategories';

export default function CategoriesSlider() {

   
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
      };

    

    let {data , isError, isLoading , error} = useCategories()

    if (isLoading) {
      return <Loading />
    }
    
    if (isError){
      return <ErrorMsg error = {error?.message} />
    }

  return (
    <>
    {<div className="container mt-10">
    <Slider {...settings}>
    {data?.map(ele=><Cat key={ele._id} ele={ele}></Cat>)}
    </Slider>
    </div>}
    </>

  )
}


function Cat({ele}) {

    return (
      <div>
      <img className='h-[280px] object-cover w-full' src={ele.image} alt={ele.name} />
      </div>
    )
    
}