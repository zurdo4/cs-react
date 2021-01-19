import Modal from "react-bootstrap/Modal";
import React from "react";
import axios from "axios";
import "./App.css";


class OrgModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

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

  closeModal = (e) => {
    e.preventDefault();
    this.props.setValue("orgId", 0);
    this.props.setValue("orgCode", "");
    this.props.setVisible("orgModal", false);
    //this.props.setUpdated("orgList", false);
    return false;
  };

  handleInputChange = (e) => {
    this.props.setValue("orgCode", e.target.value);
  };

  submit = (e) => {
    if (this.props.value.orgCode_value === "") {
      e.preventDefault();
      this.setState({ message: "La clave es requerida" });
      return;
    }

    var re = /^[A-Za-z0-9]+$/g;

    if (!re.test(this.props.value.orgCode_value)) {
      e.preventDefault();
      this.setState({ message: "Solo letras y/o numeros sin espacios" });
      return;
    }

   
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
          <form onSubmit={this.submit} noValidate validated={this.isvalid}>
            <div className="modal-body">
              <div className="form-group">
                <label>Clave</label>
                <input
                  type="text"
                  name="code"
                  onChange={this.handleInputChange}
                  value={this.props.value.orgCode_value}
                  placeholder="Proporcione la clave"
                  className="form-control"
                />
              </div>
              {this.state.message !== "" && (
                <div className="text-danger">{this.state.message}</div>
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

export default OrgModal;
