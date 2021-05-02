
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Label } from 'reactstrap';
import { useState,useEffect } from "react";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import PaymentAPI from '../API/PaymentAPI'
import ServiceAPI from '../API/ServiceAPI'
import CustomerAPI from '../API/CustomerAPI'
import DogAPI from '../API/DogAPI'
import AccountAPI from '../API/AccountAPI'
export default function PaymentDepositModal({service_id,mytoken}) {

const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);

  const [customerName,setCustomerName]=useState("")
  const [dogName,setDogName]=useState("")
  const [accountNumber,setAccountNumber]=useState("");
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
    PaymentAPI.pay(service_id,paymentID,data)
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
        if (listPayment[i].service===service_id){
          setPaymentID(listPayment[i].id);
          setPaymentTotal(listPayment[i].id);
          break;
        }
      }

      console.log("listPayment")
      console.log(listPayment)
  }
  const getCustomerAndDogInfo=async()=>{
    const responseService =await ServiceAPI.getService(mytoken,service_id)
    const serviceInfo=responseService.data
    console.log("serviceInfo")
    console.log(serviceInfo)

    const responseCustomer=await CustomerAPI.getCustomerDetails(mytoken,serviceInfo.dog.customer)
    const customerInfo=responseCustomer.data
    console.log("customerInfo")
    console.log(customerInfo)

    setCustomerName(customerInfo.first_name+" "+customerInfo.last_name)
    
    const responseDog=await DogAPI.GetOneDog(mytoken,serviceInfo.dog.customer,serviceInfo.dog.id)
    const dogInfo=responseDog.data
    console.log("dogInfo")
    console.log(dogInfo.dog_name)
    setDogName(dogInfo.dog_name)

    const responseAccount=await AccountAPI.getAccount(mytoken,customerInfo.account)
    const accountInfo=responseAccount.data
    console.log("accountInfo")
    console.log(accountInfo)
    setAccountNumber(accountInfo.account_number)


  }

  const handlePayment=async()=>{
    getPaymentIDFromService_setTotalPayment();
    getCustomerAndDogInfo();
    toggle();
  }

    return (
        <div>
            <Button color="danger" onClick={handlePayment}>จ่ายเงินกันเถอะ ย้าฮูว</Button>
            <Modal isOpen={modal} toggle={toggle} fade={false} >
        <ModalHeader toggle={toggle}><h2>ชำระเงินค่าบริการ</h2></ModalHeader>
        <ModalBody>

         <div style={{justifyContent:"space-between",display:"flex"}}>
        <h5>ชื่อ:</h5>
        <Label>{customerName}</Label>
        </div>
        <div style={{justifyContent:"space-between",display:"flex"}}>
        <h5>สุนัข:</h5>
        <Label>{dogName}</Label>
        </div>
        <div style={{justifyContent:"space-between",display:"flex"}}>
         <h5>หมายเลขบัญชี:</h5>
         <Label >{accountNumber}</Label>
         </div>
         <div style={{justifyContent:"space-between",display:"flex"}}>
         <h4>ยอดชำระเงินรวม:</h4>
         <h4> {totalPrice} บาท</h4>
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
