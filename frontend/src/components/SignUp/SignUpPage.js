import NavbarNoAuth from "../Navbar/NavbarNoAuth";
import SignUpForm from "./SignUpForm.js";
import AskForm from "./AskForm";
import { useState } from "react";

export default function SignUpPage() {
  return (
    <div>
      <NavbarNoAuth />
      <SignUpForm />
    </div>
  );
}
