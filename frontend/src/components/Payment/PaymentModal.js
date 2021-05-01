
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Label } from 'reactstrap';
import { useState } from "react";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
export default function PaymentModal() {
const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);
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
        <ModalHeader toggle={toggle}>ชำระเงินค่าบริการ</ModalHeader>
        <ModalBody>
         <div>หมายเลขบัญชี: {accountNumber}</div>
         <div>ยอดชำระเงินรวม: {totalPrice}</div>
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
          <Button color="danger" onClick={toggle}>ยกเลิก</Button>
        </ModalFooter>
      </Modal>
        </div>
    )
}
