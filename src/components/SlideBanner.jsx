import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import '../components/SlideBanner.scss';

const SlideBanner = () => {
    return (
        <div className="SlideBanner">
            <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            slidesPerView={1}
            loop
            autoplay={{delay: 5000, disableOnInteraction: false}}
            pagination={{clickable: 'true'}}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}>
                <SwiperSlide className="slide">
                    <img className="slideimage" alt="" />
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <img className="slideimage" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <img className="slideimage" alt=""/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SlideBanner;