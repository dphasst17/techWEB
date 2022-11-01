import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const slideImages = [
    {
        url: 'https://www.anphatpc.com.vn/media/news/0812_mngnh.jpg',
        caption: 'Slide 1'
    },
    {
        url: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/55c1d3ba-e4ea-428f-8cf3-4380967d20c5.__CR0,0,970,300_PT0_SX970_V1___.png',
        caption: 'Slide 2'
    },
    {
        url: 'https://no1computer.vn/upload_images/images/2022/03/01/acer-nitro-5-2022-news-1(1).jpg',
        caption: 'Slide 3'
    },
    {
        url: 'https://d9n64ieh9hz8y.cloudfront.net/wp-content/uploads/20220105235118/ces-2022-asus-ra-mat-dai-laptop-choi-game-moi-tai-su-kien-rog-the-rise-of-gamers-tin-gaming-gear-1.jpg',
        caption: 'Slide 4'
    },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
       {slideImages.map((slideImage, index)=> (
          <div className="each-slide" key={index}>
            <div>
              <img src={slideImage.url} alt="Slide-show" />
            </div>
          </div>
        ))} 
      </Slide>
    </div>
  )
}

export default Slideshow;