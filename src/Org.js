import React from "react";

import Table from "react-bootstrap/Table";
import { Provider } from "react-redux";
import ReduxComponents from "./ReduxComponents.js";
import "./App.css";

class Org extends React.Component {
  componentDidMount() {
    this.props.apiGet("orgList", []);
  }

  showOrgModal = (id) => {
    this.props.setVisible("orgModal", id);
  };

  // delete = (id) => {
  //   const url = "http://129.146.175.158:8080/cs/admin/orgs/" + id;
  //   axios
  //     .delete(url)
  //     .then((res) => {
  //       this.props.setUpdated("orgList", false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="4">
                <h3>Unidades Organizacionales</h3>
              </th>
            </tr>
            <tr>
              <th style={{ textAlign: "right" }} colSpan="4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.showOrgModal(0);
                  }}
                >
                  Agregar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              //this.state.data.map((org) => {
              Array.isArray(this.props.api.orgList) &&
              this.props.api.orgList.length > 0
                ? this.props.api.orgList.map((org) => {
                    return (
                      <tr>
                        <td style={{ fontSize: 18, color: "#007bff" }}>
                          {org.code}
                        </td>
                        <td style={{ textAlign: "center", width: "50%" }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.props.apiGet("orgItem", org.id);
                              this.showOrgModal(org.id);
                            }}
                          >
                            Editar
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.props.apiGet("orgItem", org.id);
                              this.showOrgModal(org.id);
                            }}
                          >
                            Contribuyentes
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.showOrgModal(org.id);
                            }}
                          >
                            Contadores
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => { 
                         
                              this.props.apiDelete("orgItem", org.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null
            }
          </tbody>
        </Table>
        <Provider store={ReduxComponents.store}>
          <ReduxComponents.OrgModal />
        </Provider>
      </React.Fragment>
    );
  }
}

export default Org;
