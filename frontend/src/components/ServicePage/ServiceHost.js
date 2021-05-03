import React, { useEffect, useState } from "react";
import {
  Container,
  UncontrolledCarousel,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import "./Service.css";
import GoogleMapService from "./GoogleMapService.js";

export default function ServiceHost({ host }) {
  const [hostAddress, sethostAddress] = useState()
  useEffect(() => {
    if (host) {
      sethostAddress(host.address)
      setitems(host.house_image)
      // console.log("wheremypicture",host)
    }
  }, [host])
  const [items, setitems] = useState([])


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

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img
          className="resize-img"
          src={item.picture}

          onClick={onImageOpenClick}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  const [selectedImage, setSelectedImage] = useState(null);

  function ImageHost() {
    return (
      <div className="hostImage-post">
        <div className="hostImage-bg" onClick={onImageCloseClick} />
        <div className="hostImage-content">
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
        </div>
      </div>
    );
  }

  function onImageOpenClick() {
    setSelectedImage(true);
  }

  function onImageCloseClick() {
    setSelectedImage(null);
  }

  let imageHost = null;
  if (!!selectedImage) {
    imageHost = <ImageHost />;
  }

  return (
    <div>
      <Row>
        <Col>
          <Carousel
            className="hostImage-content-small"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
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
        </Col>
      </Row>

      <Row className="host-row" style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Col>
          <GoogleMapService host={host} />
        </Col>
      </Row>

      <Row className="host-row">
        <Col  xs={12}>
          <h4>ที่อยู่</h4>
        </Col>
        <Col>
 
            <p style={{ wordWrap:"break-word"}}>{hostAddress}</p>
  
        </Col>



      </Row>
      <Row>{imageHost}</Row>
    </div>
  );
}
