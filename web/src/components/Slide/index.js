import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const properties = {
  showArrows: true,
  showStatus: false,
  showIndicators: false,
  showThumbs: false,
  infiniteLoop: true,
  stopOnHover: true,
  interval: 4000,
  transitionTime: 750,
  autoPlay: true,
};

export default function Slide() {
  return (
    <Carousel {...properties}>
      <div>
        <img src={require('../../assets/imgSlide2.jpg')} alt="" />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src={require('../../assets/slide2.jpg')} alt="" />
      </div>
      <div>
        <img src={require('../../assets/slide3.jpg')} alt="" />
      </div>
    </Carousel>
  );
}
