import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Label } from 'reactstrap';
import { useState,useEffect } from "react";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import PaymentAPI from '../API/PaymentAPI'
import AccountAPI from '../API/AccountAPI'
import { useCookies } from "react-cookie";
export default function PaymentLateModal({service_id,customer,dog,checkHostOrCustomer}){
  const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
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
      PaymentAPI.payLate(service_id,paymentID,data)
      checkHostOrCustomer();
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
          if ((listPayment[i].service===service_id)&&(listPayment[i].type_payments==="late")){
              console.log("listPayment[i].id");
              console.log(listPayment[i].id)
            setPaymentID(listPayment[i].id);
            setPaymentTotal(listPayment[i].id);
            break;
          }
        }
  
        console.log("listPayment")
        console.log(listPayment)
    }
    const getAccountNumber=async()=>{

      const responseAccount=await AccountAPI.getAccount(cookies.mytoken,customer.account)
      const accountInfo=responseAccount.data
      console.log("accountInfo")
      console.log(accountInfo)
      setAccountNumber(accountInfo.account_number)
  
  
    }
  
    const handlePayment=async()=>{
      getPaymentIDFromService_setTotalPayment();
      getAccountNumber();
      toggle();
    }
  
      return (
          <div>
          
              <Button color="danger" onClick={handlePayment}>ชำระเงินค่าบริการเลยเวลา</Button>
              <Modal isOpen={modal} toggle={toggle} fade={false} >
          <ModalHeader toggle={toggle}><h2>ชำระเงินค่าบริการเลยเวลา</h2></ModalHeader>
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
           <h4>ยอดชำระเงินรวม:</h4>
           <h4 > {totalPrice} บาท </h4>
           </div>
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