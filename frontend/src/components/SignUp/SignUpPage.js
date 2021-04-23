
import NavbarNoAuth from "../Navbar/NavbarNoAuth";
import SignUpForm from "./SignUpForm.js";


export default function SignUpPage() {
  return (
    <div>
      <NavbarNoAuth />
      <section className="SignUpForm"><SignUpForm /></section>
      
    </div>
  );

}