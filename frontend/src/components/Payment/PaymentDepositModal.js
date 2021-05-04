
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Label } from 'reactstrap';
import { useState,useEffect } from "react";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import PaymentAPI from '../API/PaymentAPI'

export default function PaymentDepositModal({service_id, customer, dog}) {

const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);

  const [customerName,setCustomerName]=useState(null)
  const [dogName,setDogName]=useState(null)
  const [accountNumber,setAccountNumber]=useState(null);
  const [totalPrice,setTotalPrice]=useState(null)
  const [paymentID,setPaymentID]=useState(null);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  const handlePay=()=>{
    toggleAll();
    const data={accept_payment:true}
    PaymentAPI.payDeposit(service_id,paymentID,data)
  }
  const setPaymentTotal=async(payment_id)=>{
      const response= await PaymentAPI.getPayment(service_id,payment_id)
      const payment =response.data
      setTotalPrice(payment.pay_total)
      console.log("payment")
      console.log(payment)

  }
  const getPaymentIDFromService_setTotalPayment=async()=>{
      const response=await PaymentAPI.listPayment(service_id)
      const listPayment=response.data

      for (var i=0;i<listPayment.length;i++){
        if (listPayment[i].service===service_id&&listPayment[i].type_payments==="deposit"){
          setPaymentID(listPayment[i].id);
          setPaymentTotal(listPayment[i].id);
          break;
        }
      }

      console.log("listPayment")
      console.log(listPayment)
  }


  const handlePayment=async()=>{
    getPaymentIDFromService_setTotalPayment();
    
    toggle();
  }

    return (
        <div>
   
            <Button color="success" onClick={handlePayment}>ชำระเงินค่าบริการ</Button>
            <Modal isOpen={modal} toggle={toggle} fade={false} >
        <ModalHeader toggle={toggle}><h2>ชำระเงินค่าบริการ</h2></ModalHeader>
        <ModalBody>

         <div style={{justifyContent:"space-between",display:"flex"}}>
        <h5>ชื่อ:</h5>
        <Label>{customer.first_name+" "+customer.last_name}</Label>
        </div>
        <div style={{justifyContent:"space-between",display:"flex"}}>
        <h5>สุนัข:</h5>
        <Label>{dog.dog_name}</Label>
        </div>
        <div style={{justifyContent:"space-between",display:"flex"}}>
         <h5>หมายเลขบัญชี:</h5>
         <Label >{accountNumber}</Label>
         </div>
         <div style={{justifyContent:"space-between",display:"flex"}}>
         <h5>ยอดชำระเงินรวม:</h5>
         <Label > {totalPrice} บาท</Label>
         </div>
         <small style={{ color: "red" }}>หมายเหตุ: กรุณาชำระค่าบริการภายใน 1 ชั่วโมง มิฉะนั้นบริการของคุณจะถูกยกเลิก</small>
          <br />
          <Modal isOpen={nestedModal} fade={false} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalBody>คุณต้องการยืนยันการชำระเงินใช่หรือไม่</ModalBody>
            <ModalFooter>
              <Button color="success" onClick={handlePay}>ยืนยัน</Button>{' '}
              <Button color="danger" onClick={toggleNested}>ยกเลิก</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggleNested}>ชำระเงิน</Button>{' '}

        </ModalFooter>
      </Modal>
        </div>
    )
}
