import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./dashboardSlide.css";
import { Pagination } from "swiper";
import image1 from "../../assets/slides/image1.jpg";
import image2 from "../../assets/slides/image2.jpg";
import image3 from "../../assets/slides/image3.jpg";
import image4 from "../../assets/slides/image4.jpg";
import image5 from "../../assets/slides/image5.jpg";
import { IonImg } from "@ionic/react";

export default function DashboardSlides() {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
        <SwiperSlide>
          <IonImg src={image3} className='custom-images' />
        </SwiperSlide>
        <SwiperSlide>
          <IonImg src={image5} className='custom-images' />
        </SwiperSlide>
        <SwiperSlide>
          <IonImg src={image1} className='custom-images' />
        </SwiperSlide>
        <SwiperSlide>
          <IonImg src={image2} className='custom-images' />
        </SwiperSlide>
        <SwiperSlide>
          <IonImg src={image4} className='custom-images' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
