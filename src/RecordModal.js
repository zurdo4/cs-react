import Modal from "react-bootstrap/Modal";
import React from "react";

import "./App.css";

class RecordModal extends React.Component {
  closeModal = (e) => {
    e.preventDefault();
    this.props.setHidden("recordModal");
    return false;
  };

  handleInputChange = (e) => {
    this.props.setValue("recordCode", e.target.value);
  };

  submit = (e) => {
    e.preventDefault();
    if (this.props.value.recordCode_value === "") {
      this.props.setValue("message", "La clave es valor automatico");
      return;
    }

    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!re.test(this.props.value.recordCode_value)) {
      this.props.setValue("message", "La clave es valor automatico");
      return;
    }

    if (this.props.value.recordId_value === 0) {
      this.props.apiPost("recordItem", {
        id: this.props.value.recordId_value,
        code: this.props.value.recordCode_value,
        rfc_id: this.props.value.rfcId_value,
      });
    } else {
      this.props.apiPut("recordItem", {
        id: this.props.value.recordId_value,
        code: this.props.value.recordCode_value,
        rfc_id: this.props.value.rfcId_value,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.visible.recordModal_visible ? true : false}>
          <form onSubmit={this.submit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Clave</label>
                <input
                  type="text"
                  name="code"
                  onChange={this.handleInputChange}
                  value={this.props.value.recordCode_value}
                  placeholder="Valor automatico"
                  className="form-control"
                />
              </div>
              {this.props.message_value !== "" && (
                <div className="text-danger">
                  {this.props.value.message_value}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Aceptar
              </button>
              &nbsp;
              <button className="btn btn-primary" onClick={this.closeModal}>
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RecordModal;
