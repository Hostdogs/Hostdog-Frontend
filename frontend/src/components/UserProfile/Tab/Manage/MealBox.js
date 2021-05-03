import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  Input,
  Row,
  Col,
  Table,
  CustomInput,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import moment from "moment-timezone";
import HostImgAPI from "../../../API/HostImgAPI";
import { useCookies } from "react-cookie";
import "./ManageTab.css";
import MealAPI from "../../../API/MealAPI";
const startMeal = {
  id: "",
  meal_type: "",
  meal_price_per_gram: "",
};
export default function MealBox() {
  const [meal, setMeal] = useState(startMeal);
  const [allMeals, setAllMeals] = useState([]);
  const [myMealId, setMyMealId] = useState([]);
  const [allMyMeals, setAllMyMeals] = useState([]);
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const myId = cookies["user_id"];
  const myToken = cookies["mytoken"];
  const [dropdownTypeOpen, setTypeOpen] = useState(false);
  const toggleType = () => setTypeOpen(!dropdownTypeOpen);

  useEffect(() => {
    MealAPI.GetAllMeals(myToken).then((resp) => {
      setAllMeals(resp.data);
    });
    MealAPI.GetMyMeals(myToken, myId).then((resp) => {
      setAllMyMeals(resp.data);
    });
  }, []);

  useEffect(() => {
    allMyMeals.forEach((myMeal) => {
      if (!myMealId.includes(myMeal.id)) {
        myMealId.push(myMeal.id);
      }
    });
    //console.log(myMealId);
  }, [allMyMeals]);

  const myMealElements = allMyMeals.map((theMeal, index) => {
    return (
      <tr key={theMeal.id}>
        <th scope="row">{index + 1}</th>
        <td>
          <Row>
            <Col xs="12">{theMeal.meal_type}</Col>
          </Row>
        </td>
        <td>
          <Row>
            <Col xs="12">
              {theMeal.meal_price_per_gram} {" บาท"}
            </Col>
          </Row>
        </td>
        <td>
          <Col xs="12" style={{ textAlign: "center" }}>
            <Button
              color="danger"
              size="sm"
              onClick={() => onMealsDelete(theMeal.id)}
            >
              ลบ
            </Button>
          </Col>
        </td>
      </tr>
    );
  });

  function onAddMeal(meal) {
    setMeal(meal);
  }

  const mealTypeElements = allMeals
    .filter((theMeal) => {
      return !myMealId.includes(theMeal.id);
    })
    .map((meal) => {
      return (
        <DropdownItem key={meal.id} onClick={() => onAddMeal(meal)}>
          {meal.meal_type}
        </DropdownItem>
      );
    });

  const updateMyMeals = (meal) => {
    setAllMyMeals((prevAllMeal) => {
      return [...prevAllMeal, meal];
    });
  };

  function onSubmitMeal(event) {
    event.preventDefault();
    MealAPI.AddMyMeal(myToken, myId, { meal: meal.id }).then((resp) => {
      updateMyMeals(meal);
    });
    setMeal(startMeal);
  }

  const deleteMyMeal = (meal_id) => {
    const newMyId = myMealId.filter((id) => {
      return id !== meal_id;
    });
    setMyMealId(newMyId);
    setAllMyMeals((prevAllMeal) => {
      return prevAllMeal.filter((meal) => {
        return meal.id !== meal_id;
      });
    });
  };

  function onMealsDelete(meal_id) {
    MealAPI.DeleteMyMeals(myToken, myId, meal_id).then((resp) => {
      deleteMyMeal(meal_id);
    });
  }

  return (
    <div>
      <Label>
        <h4>อาหารสุนัข</h4>
      </Label>
      {allMyMeals.length > 0 ? (
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>ประเภทอาหารสุนัข</th>
              <th>ราคาต่อ100กรัม</th>
              <th>แก้ไข</th>
            </tr>
          </thead>
          <tbody>{myMealElements}</tbody>
        </Table>
      ) : null}

      <Row>
        <Col xs="auto">เพิ่มประเภทอาหาร :</Col>
        <Col xs="auto">
          <ButtonDropdown isOpen={dropdownTypeOpen} toggle={toggleType}>
            <DropdownToggle caret size="sm">
              {meal.meal_type === "" ? "เลือกประเภทอาหาร" : meal.meal_type}
            </DropdownToggle>
            <DropdownMenu>{mealTypeElements}</DropdownMenu>
          </ButtonDropdown>
        </Col>
        <Col xs="auto">
          <Button size="sm" color="primary" onClick={onSubmitMeal}>
            เพิ่ม
          </Button>
        </Col>
      </Row>
    </div>
  );
}
