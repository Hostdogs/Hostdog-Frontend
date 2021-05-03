import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/service/meals/";

export default class MealAPI{
    static getMeal(mytoken, meal_id){
        const url=`${API_URL}${meal_id}/`
        return axios.get(url,{
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${mytoken}`,
            },
          });

    }
}