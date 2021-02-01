import React from "react";

import Table from "react-bootstrap/Table";
import { Provider } from "react-redux";
import ReduxComponents from "./ReduxComponents.js";
import { withRouter } from "react-router-dom";
import "./App.css";

class Analyst extends React.Component {

  
  componentDidMount() {
    this.props.apiGet("orgItem", this.props.value.orgId_value);
    this.props.apiGet("analystList", this.props.value.orgId_value);
  }

  showAnalystModal = (id) => {
    this.props.setVisible("analystModal", id);
  };

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="4">
                <h3>Contadores( {this.props.api.orgItem.code} )</h3>
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
                    this.showAnalystModal(0);
                  }}
                >
                  Agregar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(this.props.api.analystList) &&
            this.props.api.analystList.length > 0
              ? this.props.api.analystList.map((analyst) => {
                  return (
                    <tr>
                      <td style={{ fontSize: 18, color: "#007bff" }}>
                        {analyst.code}
                      </td>
                      <td style={{ textAlign: "center", width: "50%" }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.props.apiGet("analystItem", analyst.id);
                            this.showAnalystModal(analyst.id);
                          }}
                        >
                          Editar
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.showAnalystModal(analyst.id);
                          }}
                        >
                          Contribuyentes
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.props.apiDelete("analystItem",  {id: analyst.id, org_id: analyst.org.id} );
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
          <ReduxComponents.AnalystModal />
        </Provider>
      </React.Fragment>
    );
  }
}
export default withRouter(Analyst);
