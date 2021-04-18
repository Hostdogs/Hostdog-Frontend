import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ModalDogForm = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  console.log({name,age,weight});
  return (
    <div>
      <Button color="warning" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>กรอกโปรไฟล์สุนัข</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input placeholder="ชื่อสุนัขของคุณ" onChange={e=>setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Age</Label>
              <Input placeholder="อายุ" onChange={e=>setAge(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Weight</Label>
              <Input placeholder="น้ำหนักของสุนัข" onChange={e=>setWeight(e.target.value)} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle} >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalDogForm;
