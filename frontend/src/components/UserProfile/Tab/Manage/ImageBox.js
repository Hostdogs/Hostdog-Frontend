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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
  const [isChange, setIsChange] = useState(false);
  const [file, setFile] = useState(null);
  //const [preview, setPreview] = useState(null);

  useEffect(() => {
    HostImgAPI.GetHostImg(myToken, myId).then((response) => {
      setAllPictures(response.data);
    });
  }, []);

  useEffect(() => {
    if (picture !== "" && picture !== null && picture !== undefined) {
      setIsChange(true);
    }
  }, [picture]);

  function onHouseImgChange(event) {
    if (event.target.files[0]) {
      setPicture(event.target.files[0]);
      setFile(URL.createObjectURL(event.target.files[0]));
    }
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
    setIsChange(false);
    setFile(null);
  }

  function onCancelImg(event) {
    event.preventDefault();
    setIsChange(false);
    setFile(null);
    setPicture("");
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
        <div className="HostPicture">
          <img className="resize-imgHost" src={pic.picture} />
          <Button onClick={() => onDelete(pic)}>
            <FontAwesomeIcon
              icon={faTimes}
              className="mr-2"
              style={{ position: "absolute", top: "18px", right: "10px" }}
            />
          </Button>
        </div>
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
        borderRadius: "20px",
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
              borderWidth: "1.5px",
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
          <h5 style={{ margin: "5px", marginTop: "15px" }}>เพิ่มรูป</h5>
          <Input
            type="file"
            name="picture"
            accept="image/*"
            onChange={onHouseImgChange}
          />
        </FormGroup>
        {file ? (
          <div style={{ textAlign: "center" }}>
            <img className="resize-imgHost" src={file} />
          </div>
        ) : null}

        {isChange ? (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Button
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={onAddImg}
            >
              ยืนยัน
            </Button>
            <Button color="danger" onClick={onCancelImg}>
              ยกเลิก
            </Button>
          </div>
        ) : null}
      </Form>
    </div>
  );
}
