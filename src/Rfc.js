import React from "react";

import Table from "react-bootstrap/Table";
import { Provider } from "react-redux";
import ReduxComponents from "./ReduxComponents.js";
import { withRouter } from "react-router-dom";
import "./App.css";

class Rfc extends React.Component {
  componentDidMount() {
    this.props.apiGet("rfcList", this.props.value.orgId_value);
  }

  showRfcModal = (id) => {
    this.props.setVisible("rfcModal", id);
  };

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="4">
                <h3>Contribuyentes</h3>
              </th>
            </tr>
            <tr>
              <th colSpan="4">
                <a
                  onClick={() => {
                    this.props.history.push("/configuration");
                  }}
                  href="#"
                >
                  Organizaciones
                </a>
              </th>
            </tr>
            <tr>
              <th style={{ textAlign: "right" }} colSpan="4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.showRfcModal(0);
                  }}
                >
                  Agregar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(this.props.api.rfcList) &&
            this.props.api.rfcList.length > 0
              ? this.props.api.rfcList.map((rfc) => {
                  return (
                    <tr>
                      <td style={{ fontSize: 18, color: "#007bff" }}>
                        {rfc.code}
                      </td>
                      <td style={{ textAlign: "center", width: "50%" }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.props.apiGet("rfcItem", rfc.id);
                            this.showRfcModal(rfc.id);
                          }}
                        >
                          Editar
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.showRfcModal(rfc.id);
                          }}
                        >
                          Contadores
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.props.apiDelete("rfcItem", rfc.id);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        <Provider store={ReduxComponents.store}>
          <ReduxComponents.RfcModal />
        </Provider>
      </React.Fragment>
    );
  }
}
export default withRouter(Rfc);
