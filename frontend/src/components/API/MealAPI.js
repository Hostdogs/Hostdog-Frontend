import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/";

export default class MealAPI {
  static GetAllMeals(mytoken) {
    const url = `${API_URL}service/meals/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static GetMyMeals(mytoken, host_id) {
    const url = `${API_URL}profilehost/${host_id}/host-service/${host_id}/meals/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
  static AddMyMeal(mytoken, host_id, meal_id) {
    const url = `${API_URL}profilehost/${host_id}/host-service/${host_id}/meals/`;
    return axios.post(url, meal_id, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static DeleteMyMeals(mytoken, host_id, meal_id) {
    const url = `${API_URL}profilehost/${host_id}/host-service/${host_id}/meals/${meal_id}/`;
    return axios.delete(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
