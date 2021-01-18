import Modal from "react-bootstrap/Modal";
import React from "react";

import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import axios from "axios";
import { Alert } from "bootstrap";

class OrgModal extends React.Component {
  fetchData() {
    const url =
      "http://129.146.175.158:8080/cs/admin/orgs/" +
      this.props.value.orgId_value;
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

  handleInputChange = (e) => {
    this.props.setValue("orgCode", e.target.value);
  };

  submit = () => {
    if (this.props.value.orgId_value > 0) {
      this.put();
    } else {
      this.post();
    }
  };

  post = () => {
    const url = "http://129.146.175.158:8080/cs/admin/orgs/";
    axios
      .post(url, {
        id: this.props.value.orgId_value,
        code: this.props.value.orgCode_value,
      })
      .then((res) => {
    
     
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  put = () => {
    const url =
      "http://129.146.175.158:8080/cs/admin/orgs/" +
      this.props.value.orgId_value;
    axios
      .put(url, {
        id: this.props.value.orgId_value,
        code: this.props.value.orgCode_value,
      })
      .then((res) => {
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.visible.orgModal_visible ? true : false}>
          <form onSubmit={this.submit}>
            <ModalHeader>
              <ModalTitle>Hi</ModalTitle>
            </ModalHeader>
            <ModalBody>
              {/* <input type="hidden" value={this.props.value.orgId_value} />
            <br /> */}

              <input
                name="orgCode_value"
                onChange={this.handleInputChange}
                value={this.props.value.orgCode_value}
              />

              <br />
            </ModalBody>
            <ModalFooter>
              <button type="submit">Aceptar</button>
              &nbsp;
              <button
                onClick={() => {
                  this.closeModal();
                }}
              >
                Cancelar
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default OrgModal;
