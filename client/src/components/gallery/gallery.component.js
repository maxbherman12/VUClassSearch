import React from 'react'
import './gallery.styles.css'

import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";

import SchedulePageImg from '../../assets/schedule-page-demo.png'
import CoursePageImg from '../../assets/course-page-demo.png'
import ProfilePageImg from '../../assets/profile-page-demo.png'

const images = [
    {
        original: SchedulePageImg
    },
    {
        original: CoursePageImg
    },
    {
        original: ProfilePageImg
    }
]

const Gallery = () => (
    <ImageGallery 
        items={images}
        autoPlay
        showNav={false}
        showThumbnails={false}
        showPlayButton={false} showFullscreenButton={false}
        slideInterval={4000}
    />
)

export default Gallery;