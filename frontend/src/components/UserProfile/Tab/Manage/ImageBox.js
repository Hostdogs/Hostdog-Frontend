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

  useEffect(() => {
    HostImgAPI.GetHostImg(myToken, myId).then((response) => {
      setAllPictures(response.data);
      console.log(response.data);
    });
  }, []);

  function onHouseImgChange(event) {
    const file = event.target.files[0];
    setPicture(file);
  }

  function onAddImg(event) {
    event.preventDefault();
    if (picture !== "") {
      let form_data = new FormData();
      form_data.append("picture", picture, picture.name);
      HostImgAPI.AddHostImg(myToken, myId, form_data).then((response) => {
        console.log(response);
      });
    }
  }

  const next = () => {
    const nextIndex =
      activeIndex === allPictures.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex =
      activeIndex === 0 ? allPictures.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = allPictures.map((pic) => {
    return (
      <CarouselItem key={pic.id}>
        <div className="container">
          <img className="resize-imgHost" src={pic.picture} />
          <Button onClick={() => onDelete(pic)}>ลบ</Button>
        </div>
      </CarouselItem>
    );
  });

  function onDelete(pic) {
    console.log(pic.id);
    HostImgAPI.DeleteHostImg(myToken, myId, pic.id).then((resp) => {
      console.log(resp);
    });
  }

  return (
    <div>
      <Form>
        <FormGroup>
          {allPictures !== [] ? (
            <Carousel
              className="hostImage-content-small"
              activeIndex={activeIndex}
              next={next}
              previous={previous}
            >
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
        <Button onClick={onAddImg}>เพิ่ม</Button>
      </Form>
    </div>
  );
}
