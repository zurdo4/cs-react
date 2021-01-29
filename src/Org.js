import React from "react";

import Table from "react-bootstrap/Table";
import { Provider } from "react-redux";
import ReduxComponents from "./ReduxComponents.js";
import { withRouter } from "react-router-dom";
import "./App.css";

class Org extends React.Component {
  goToRfcs = () => {
    this.props.history.push("/rfc");
  };

  componentDidMount() {
    this.props.apiGet("orgList", []);
  }

  showOrgModal = (id) => {
    this.props.setVisible("orgModal", id);
  };

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
                              this.showOrgModal(org.id);
                            }}
                          >
                            Editar
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-primary"
                            onClick={this.goToRfcs}
                          >
                            Contribuyentes
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-primary"
                            onClick={() => {}}
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
export default withRouter(Org);
