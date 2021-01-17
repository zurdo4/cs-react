import Modal from "react-bootstrap/Modal";
import React from "react";

import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import axios from "axios";
import { setValue } from "./ReduxComponents";

class OrgModal extends React.Component {
  
  fetchData() {
    const url =
      "http://localhost:8080/cs/admin/orgs/" + this.props.value.orgId_value;
    axios
      .get(url)
      .then((res) => {
        this.props.setValue("orgId", res.data.id);
        this.props.setValue("orgCode", res.data.code);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
  
    if (!this.props.updated.orgModal_updated) {
      if (this.props.value.orgId_value > 0) {
        this.fetchData();
      } else {
        this.props.setValue("orgId", 0);
        this.props.setValue("orgCode", "");
      }

      this.props.setUpdated("orgModal", true);
    }
  }

  closeModal = () => {
    this.props.setValue("orgId", 0);
    this.props.setValue("orgCode", "");
    this.props.setVisible("orgModal", false);
    this.props.setUpdated("orgList", false);
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.visible.orgModal_visible ? true : false}>
         
          <ModalBody>

            <p>El número de contacto no tiene 10 digitos!</p>
          
          </ModalBody>
          <ModalFooter>
            {/* <button
              onClick={() => {
                this.closeModal();
              }}
            >
              Corregir correo
            </button>
            &nbsp; */}
            <button
              onClick={() => {
                this.closeModal();
              }}
            >
              Aceptar
            </button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}


// render() {
//   return (
//     <React.Fragment>
//       <Modal show={this.props.visible.orgModal_visible ? true : false}>
//         <ModalHeader>
//           <ModalTitle>Hi</ModalTitle>
//         </ModalHeader>
//         <ModalBody>
//           <input value={this.props.value.orgId_value} />
//           <br />
//           <input value={this.props.value.orgCode_value} />
//           <br />
//         </ModalBody>
//         <ModalFooter>
//           <button
//             onClick={() => {
//               this.closeModal();
//             }}
//           >
//             Aceptar
//           </button>
//           &nbsp;
//           <button
//             onClick={() => {
//               this.closeModal();
//             }}
//           >
//             Cancelar
//           </button>
//         </ModalFooter>
//       </Modal>
//     </React.Fragment>
//   );
// }
// }




export default OrgModal;
