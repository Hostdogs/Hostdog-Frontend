import { useState } from "react";
import CustomerSignUpForm from "./CustomerSignUpForm";
import HostSignUpForm from "./HostSignUpForm";
import AskForm from "./AskForm";

export default function SignUpForm() {
  const [showCustomer, setShowCustomer] = useState(false);
  const [showHost, setHost] = useState(false);

  const [state, setState] = useState("");

  const handleAskForm = () => {
    if (state === "Host") {
      setHost(true);
    } else if (state === "Customer") {
      setShowCustomer(true);
    }
  };
  const changeAskForm = (e) => {
    setState(e.target.value);
  };

  return (
    <div
      style={{
        fontFamily: "Sarabun",
        margin: "auto",
        width: "100%",
        padding: "30px",
      }}
    >
      {!showHost && !showCustomer ? (
        <AskForm
          handleChangeValue={changeAskForm}
          handleChooseWhich={handleAskForm}
        />
      ) : null}

      {showCustomer ? <CustomerSignUpForm /> : null}

      {showHost ? <HostSignUpForm /> : null}
    </div>
  );
}
