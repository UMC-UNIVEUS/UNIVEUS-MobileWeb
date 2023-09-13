import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Booth from '../assets/images/booth_banner.png';
import Use from '../assets/images/use_banner.png';
import Univeus from '../assets/images/univeus_banner.png';

import '../components/SlideBanner.scss';

const SlideBanner = () => {
	return (
		<div className="SlideBanner">
			<Swiper
				modules={[Navigation, Autoplay, Pagination]}
				slidesPerView={1}
				loop
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				pagination={{ clickable: 'true' }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				<SwiperSlide className="slide">
					<img
						className="slideimage"
						src={Use}
						alt="이용약관 배너 이미지"
						onClick={() => {
							window.location.href = 'https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a';
						}}
					/>
				</SwiperSlide>
				<SwiperSlide className="slide">
					<img className="slideimage" src={Univeus} alt="유니버스 설명 배너 이미지" />
				</SwiperSlide>
				<SwiperSlide className="slide">
					<img className="slideimage" src={Booth} alt="부스 소개 배너 이미지" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default SlideBanner;
