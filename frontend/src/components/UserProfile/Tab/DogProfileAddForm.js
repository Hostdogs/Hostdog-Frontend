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



export default function DogProfileAddForm({toggleModal}) {


  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);

  // console.log({name,age,weight});
  const handleSubmit = () =>{
    console.log({name,age,weight});
    toggleModal()
  }

  return (
    <div>
      <Modal isOpen={toggleModal}>
        <ModalHeader >กรอกโปรไฟล์สุนัข</ModalHeader>
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
          <Button color="primary" onClick={handleSubmit} >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

