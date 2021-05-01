
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Label } from 'reactstrap';
import { useState } from "react";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
export default function PaymentModal() {
const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);

  const [customerName,setCustomerName]=useState("บาส บางขุนเทียน")
  const [dogName,setDogName]=useState("น้องบาส หลังอาน")
  const [accountNumber,setAccountNumber]=useState("1234567890");
  const [totalPrice,setTotalPrice]=useState(30.33)


  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }
    return (
        <div>
            <Button color="danger" onClick={toggle}>จ่ายเงินกันเถอะ ย้าฮูว</Button>
            <Modal isOpen={modal} toggle={toggle} fade={false} >
        <ModalHeader toggle={toggle}><h2>ชำระเงินค่าบริการ</h2></ModalHeader>
        <ModalBody>
        <div>

        {/* <h5>ชื่อ </h5>
        <p style={{textIndent:"20px"}}>{customerName}</p>
        <h5>สุนัข </h5>
        <p style={{textIndent:"20px"}}>{dogName}</p>
         <h5>หมายเลขบัญชี</h5>
         <p style={{textIndent:"20px"}}>{accountNumber}</p>
         <h5>ยอดชำระเงินรวม</h5>
         <p style={{textIndent:"20px"}}> {totalPrice} บาท</p> */}
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
         <h5>ยอดชำระเงินรวม:</h5>
         <Label > {totalPrice} บาท</Label>
         </div>


         </div>

         <small style={{ color: "red" }}>หมายเหตุ: กรุณาชำระค่าบริการภายใน 1 ชั่วโมง มิฉะนั้นบริการของคุณจะถูกยกเลิก</small>
          <br />
          <Modal isOpen={nestedModal} fade={false} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalBody>คุณต้องการยืนยันการชำระเงินใช่หรือไม่</ModalBody>
            <ModalFooter>
              <Button color="success" onClick={toggleAll}>ใช่</Button>{' '}
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
