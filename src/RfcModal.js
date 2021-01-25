import Modal from "react-bootstrap/Modal";
import React from "react";

import "./App.css";

class RfcModal extends React.Component {
  closeModal = (e) => {
    e.preventDefault();
    this.props.setHidden("rfcModal");
    return false;
  };

  handleInputChange = (e) => {
    this.props.setValue("rfcCode", e.target.value);
  };

  submit = (e) => {
    if (this.props.value.rfcCode_value === "") {
      e.preventDefault();
      this.props.setValue("message", "La clave es requerida");
      return;
    }

    var re = /^[A-Za-z0-9]+$/g;

    if (!re.test(this.props.value.rfcCode_value)) {
      e.preventDefault();
      this.props.setValue("message", "Solo letras y/o numeros sin espacios");
      return;
    }

    if (this.props.value.rfcId_value === 0) {
      this.props.apiPost("rfcItem", {
        id: this.props.value.rfcId_value,
        code: this.props.value.rfcCode_value,
      });
    } else {
      this.props.apiPut("rfcItem", {
        id: this.props.value.rfcId_value,
        code: this.props.value.rfcCode_value,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.visible.rfcModal_visible ? true : false}>
          <form onSubmit={this.submit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Clave</label>
                <input
                  type="text"
                  name="code"
                  onChange={this.handleInputChange}
                  value={this.props.value.rfcCode_value}
                  placeholder="Proporcione el RFC del contribuyente"
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

export default RfcModal;
