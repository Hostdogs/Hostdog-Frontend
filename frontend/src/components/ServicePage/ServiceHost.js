import React, { useState } from "react";
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

export default function ServiceHost() {
  const items = [
    {
      src: "host.jpg",
      key: "1",
      altText: "",
      caption: "",
    },
    {
      src: "map.jpg",
      key: "2",
      altText: "",
      caption: "",
    },
    {
      src: "host.jpg",
      key: "3",
      altText: "",
      caption: "",
    },
  ];

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
        key={item.key}
      >
        <img
          className="resize-img"
          src={item.src}
          alt={item.altText}
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
      <br />
      <br />
      <Row className="host-row">
        <Col>
        <GoogleMapService mytoken={"ac5ff12742a6890c67a44a844e203d6ed5eee68f"} host_id={3} />
        </Col>
      </Row>
      <br />
      <br />
      <Row className="host-row">
        <h4>ที่อยู่</h4>
        <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, assumenda quae incidunt commodi eius fugit corrupti reprehenderit modi perspiciatis facilis magni culpa quisquam consectetur pariatur minus doloribus dicta deserunt neque.
</p>
      </Row>
      <Row>{imageHost}</Row>
    </div>
  );
}
