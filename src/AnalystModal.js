import Modal from "react-bootstrap/Modal";
import React from "react";

import "./App.css";

class AnalystModal extends React.Component {
  closeModal = (e) => {
    e.preventDefault();
    this.props.setHidden("analystModal");
    return false;
  };

  handleInputChange = (e) => {
    this.props.setValue("analystCode", e.target.value);
  };

  submit = (e) => {
    e.preventDefault();
    if (this.props.value.analystCode_value === "") {
      this.props.setValue("message", "La clave es requerida");
      return;
    }

    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!re.test(this.props.value.analystCode_value)) {
      this.props.setValue("message", "La clave proporcionada debe ser una direccion de correo");
      return;
    }

    if (this.props.value.analystId_value === 0) {
      this.props.apiPost("analystItem", {
        id: this.props.value.analystId_value,
        code: this.props.value.analystCode_value,
        org_id: this.props.value.orgId_value,
      });
    } else {
      this.props.apiPut("analystItem", {
        id: this.props.value.analystId_value,
        code: this.props.value.analystCode_value,
        org_id: this.props.value.orgId_value,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.visible.analystModal_visible ? true : false}>
          <form onSubmit={this.submit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Clave</label>
                <input
                  type="text"
                  name="code"
                  onChange={this.handleInputChange}
                  value={this.props.value.analystCode_value}
                  placeholder="Proporcione el correo del contador"
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

export default AnalystModal;
