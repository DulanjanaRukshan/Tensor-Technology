import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 👉 Import local images
import iphone16 from "../../assets/images/hero/iphone16.jpg";
import galaxyS24 from "../../assets/images/hero/galaxy-s24.jpg";
import pixel9 from "../../assets/images/hero/pixel9.jpg";
import sonyAudio from "../../assets/images/hero/sony-audio.jpg";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "iPhone 16 \n Pro Max",
      subtitle: "Titanium Structure. A18 Pro Chip. The ultimate iPhone.",
      image: iphone16,
      color: "from-yellow-400 to-yellow-200",
    },
    {
      id: 2,
      title: "Galaxy S24 \n Ultra AI",
      subtitle: "Circle to Search. Live Translate. Epic in every way.",
      image: galaxyS24,
      color: "from-purple-400 to-blue-400",
    },
    {
      id: 3,
      title: "Google \n Pixel 9 Pro",
      subtitle: "Gemini AI built-in. The smartest camera yet.",
      image: pixel9,
      color: "from-green-400 to-emerald-200",
    },
    {
      id: 4,
      title: "Sony \n Master Series",
      subtitle: "Noise cancellation that adapts to your world.",
      image: sonyAudio,
      color: "from-blue-400 to-cyan-300",
    },
  ];

  return (
    <div className="w-full h-[500px] md:h-[650px] relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">

              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover animate-pan-image"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

              {/* Content Area */}
              <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full max-w-4xl">

                <div className={`w-20 h-2 mb-6 rounded-full bg-gradient-to-r ${slide.color}`} />

                <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white whitespace-pre-line drop-shadow-lg">
                  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${slide.color}`}>
                    {slide.title}
                  </span>
                </h2>

                <p className="text-xl md:text-2xl mb-10 text-gray-300 font-light max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Link to="/shop">
                    <button className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-gradient-to-r ${slide.color} text-black`}>
                      Buy Now
                    </button>
                  </Link>

                  <Link to="/discount">
                    <button className="px-10 py-4 rounded-full font-bold text-lg border border-white/30 text-white backdrop-blur-sm hover:bg-white/10 transition-all">
                      See Offer
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 👇 UPDATED CSS: Hides arrows on Mobile & Tablet */}
      <style>{`
        .swiper-pagination-bullet-active {
            background-color: white !important;
            width: 30px !important;
            border-radius: 8px !important;
        }

        /* Hide Navigation Arrows on screens smaller than 1024px (Mobile & Tablet) */
        @media (max-width: 1024px) {
            .swiper-button-next,
            .swiper-button-prev {
                display: none !important;
            }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;