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
  FormGroup,
  Container,
} from "reactstrap";
import moment from "moment-timezone";
import HostImgAPI from "../../../API/HostImgAPI";
import { useCookies } from "react-cookie";
import MealAPI from "../../../API/MealAPI";
import "../Manage/ManageTab.css";
export default function ServiceMealHost(props) {
  const { profileId } = props;
  const [allMyMeals, setAllMyMeals] = useState([]);
  const [cookies, setCookie] = useCookies(["mytoken", "user_id"]);
  const myToken = cookies["mytoken"];

  useEffect(() => {
    MealAPI.GetMyMeals(myToken, profileId).then((resp) => {
      setAllMyMeals(resp.data);
    });
  }, []);

  const myMealElements = allMyMeals.map((theMeal, index) => {
    return (
      <tr key={theMeal.id} style={{ color: "white" }}>
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
      </tr>
    );
  });

  return (
    <div
      style={{
        padding: "10px 10px",
        color: "white",
      }}
    >
      <FormGroup>
        <h4>อาหารสุนัข</h4>
        <hr
          style={{
            width: "50%",
            margin: "0",
            backgroundColor: "#264d59",
          }}
        />
      </FormGroup>
      <div className="table_meal">
        {allMyMeals.length > 0 ? (
          <Table bordered style={{ color: "white" }}>
            <thead>
              <tr>
                <th style={{ fontWeight: "unset" }}>#</th>
                <th style={{ fontWeight: "unset" }}>ประเภทอาหารสุนัข</th>
                <th style={{ fontWeight: "unset" }}>ราคาต่อ100กรัม</th>
              </tr>
            </thead>

            <tbody>{myMealElements}</tbody>
          </Table>
        ) : null}
      </div>
    </div>
  );
}
