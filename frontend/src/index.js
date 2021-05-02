import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentModal from "./components/Payment/PaymentModal"

ReactDOM.render(<PaymentModal service_id={53} />, document.getElementById("root"));
