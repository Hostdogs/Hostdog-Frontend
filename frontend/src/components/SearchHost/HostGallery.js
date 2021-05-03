import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container,
} from "reactstrap";
import './Host.css'




export default function HostGallery({host}) {
    const [items, setitem] = useState([])
    useEffect(() => {
        if(host){
            // console.log(host)
            setitem(host.house_image)
        }
    }, [host])
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    function onImageOpenClick() {
        setSelectedImage(true);
    }

    function onImageCloseClick() {
        setSelectedImage(null);
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.id}
                style={{width:"100%"}}
            >
                <img
                    style={{ objectFit: "contain",width:"100%",height:"50vh" }}
                    src={item.picture}
                    alt="image error"
                    onClick={onImageOpenClick}
                />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        

        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
   
    );
};

