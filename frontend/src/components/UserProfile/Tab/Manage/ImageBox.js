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
import "./ManageTab.css";

export default function ImageBox() {
  const [picture, setPicture] = useState("");
  const [allPictures, setAllPictures] = useState([]);
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    HostImgAPI.GetHostImg(myToken, myId).then((response) => {
      setAllPictures(response.data);
    });
  }, []);

  function onHouseImgChange(event) {
    const file = event.target.files[0];
    setPicture(file);
  }

  function onAddImg(event) {
    event.preventDefault();
    if (
      picture !== "" &&
      allPictures.length < 5 &&
      picture !== null &&
      picture !== undefined
    ) {
      let form_data = new FormData();
      form_data.append("picture", picture, picture.name);
      HostImgAPI.AddHostImg(myToken, myId, form_data).then((response) => {
        updatePicture(response.data);
      });
      setPicture("");
    } else {
      if (allPictures.length >= 5) {
        alert("คุณใส่รูปเยอะเกินไป");
        setPicture("");
      } else {
        alert("กรุณาเลือกรูปภาพ");
      }
    }
  }

  function onDelete(pic) {
    HostImgAPI.DeleteHostImg(myToken, myId, pic.id).then((resp) => {
      deletePicture(pic.id);
    });
  }

  const updatePicture = (pic) => {
    setAllPictures((prevAllPic) => {
      return [...prevAllPic, pic];
    });
  };

  useEffect(() => {
    goToIndex(allPictures.length - 1);
  }, [allPictures]);

  const deletePicture = (pic_id) => {
    setAllPictures((prevAllPic) => {
      return prevAllPic.filter((pic) => {
        return pic.id !== pic_id;
      });
    });
  };

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
        <div className="container">
          <img className="resize-imgHost" src={pic.picture} />
          <Button onClick={() => onDelete(pic)}>ลบ</Button>
        </div>
      </CarouselItem>
    );
  });

  return (
    <div>
      <Form>
        <FormGroup>
          <h4>รูปสถานที่รับฝาก</h4>
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

          <Label>เพิ่มรูป</Label>
          <Input
            type="file"
            name="picture"
            accept="image/*"
            onChange={onHouseImgChange}
          />
        </FormGroup>
        <Button color="primary" onClick={onAddImg}>
          เพิ่ม
        </Button>
      </Form>
    </div>
  );
}
