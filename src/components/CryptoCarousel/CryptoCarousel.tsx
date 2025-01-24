import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./CryptoCarousel.css";

export const CryptoCarousel = ({ children }: { children: React.ReactNode }) => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="crypto-carousel__container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
