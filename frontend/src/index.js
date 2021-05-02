import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentDepositModal from './components/Payment/PaymentDepositModal'

ReactDOM.render(<PaymentDepositModal service_id={53} mytoken={"ac5ff12742a6890c67a44a844e203d6ed5eee68f"}/>, document.getElementById("root"));
