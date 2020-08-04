import ImageGallery from 'react-image-gallery';
import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from '../../Gallery/threduplogo.jpg';
class Gallery extends React.Component {
  
  render() {
    
    const images = [
      {
        original: img1,
        thumbnail: img1,
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
 
    return (
        <ImageGallery items={images} useBrowserFullscreen={false} />
    );
  }
 
}

export default Gallery;