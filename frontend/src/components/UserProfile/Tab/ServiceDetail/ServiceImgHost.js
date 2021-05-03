import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CustomInput,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  UncontrolledCarousel,
} from "reactstrap";
import HostImgAPI from "../../../API/HostImgAPI";
import { useCookies } from "react-cookie";
import "../Manage/ManageTab.css";

export default function ServiceImgHost(props) {
  const { profileId } = props;
  const [allPictures, setAllPictures] = useState([]);
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    HostImgAPI.GetHostImg(myToken, profileId).then((response) => {
      setAllPictures(response.data);
      console.log(response.data);
    });
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === allPictures.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? allPictures.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = allPictures.map((pic) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={pic.id}
      >
        <img className="resize-imgHost" src={pic.picture} />
      </CarouselItem>
    );
  });

  return (
    <div
      className="col-bottom-left"
      style={{
        backgroundColor: "#43978d",
        padding: "20px 20px",
        color: "white",
        borderRadius: "3%",
      }}
    >
      <Form>
        <FormGroup>
          <h4>รูปสถานที่รับฝาก</h4>
          <hr
            style={{
              width: "50%",
              margin: "0",
              backgroundColor: "#264d59",
            }}
          />
        </FormGroup>
        <FormGroup>
          {allPictures.length !== 0 ? (
            <Carousel
              className="hostImage-content-small"
              activeIndex={activeIndex}
              next={next}
              previous={previous}
            >
              <CarouselIndicators
                items={allPictures}
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
          ) : null}
        </FormGroup>
      </Form>
    </div>
  );
}
