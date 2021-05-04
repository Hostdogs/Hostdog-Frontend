import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/service/services/";
export default class PaymentAPI {
  static payDeposit(service_id, payment_id, data) {
    const url = `${API_URL}${service_id}/payment/${payment_id}/paydeposit/`;
    return axios.post(url, data);
  }
  static getPayment(service_id, payment_id) {
    const url = `${API_URL}${service_id}/payment/${payment_id}/`;
    return axios.get(url);
  }
  static listPayment(service_id) {
    const url = `${API_URL}${service_id}/payment/`;
    return axios.get(url);
  }
  static payLate(service_id, payment_id, data) {
    const url = `${API_URL}${service_id}/payment/${payment_id}/paylate/`;
    return axios.post(url, data);
  }
}
