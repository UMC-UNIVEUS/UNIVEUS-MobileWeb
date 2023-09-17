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
import Guide from '../assets/images/guide_banner.png';

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
						src={Guide}
						alt="유니버스 사용설명 배너 이미지"
						onClick={() => {
							window.open('https://www.instagram.com/p/CxFp6WeRD6J/?igshid=MzRlODBiNWFlZA%3D%3D', '_blank');
						}}
					/>
				</SwiperSlide>
				<SwiperSlide className="slide">
					<img
						className="slideimage"
						src={Univeus}
						alt="유니버스 소개 배너 이미지"
						onClick={() => {
							window.open('https://univeus.oopy.io/0c56334b-c527-49ed-92a4-8f95d8c19dd6', '_blank');
						}}
					/>
				</SwiperSlide>
				<SwiperSlide className="slide">
					<img
						className="slideimage"
						src={Use}
						alt="이용약관 배너 이미지"
						onClick={() => {
							window.open('https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a', '_blank');
						}}
					/>
				</SwiperSlide>
				<SwiperSlide className="slide">
					<img className="slideimage" src={Booth} alt="부스 소개 배너 이미지" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default SlideBanner;
