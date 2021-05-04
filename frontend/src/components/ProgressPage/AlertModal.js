import React from 'react'
import {
    Container,
    Label,
    Button,
    Collapse,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    CustomInput,
    Card,
  } from "reactstrap";
export default function AlertModal({message,alertModal,alertToggle}) {
    return (
        <div>
    
    <Modal isOpen={alertModal} toggle={alertToggle} >
    
        <ModalBody>
          {message}
        </ModalBody>

      </Modal>
        </div>
    )
}
