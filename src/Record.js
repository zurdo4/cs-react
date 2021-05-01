import React from "react";

import Table from "react-bootstrap/Table";
import { Provider } from "react-redux";
import ReduxComponents from "./ReduxComponents.js";
import { withRouter } from "react-router-dom";
import "./App.css";

class Record extends React.Component {

  
  componentDidMount() {
    this.props.apiGet("rfcItem", this.props.value.rfcId_value);
    this.props.apiGet("recordList", this.props.value.rfcId_value);
  }

  showRecordModal = (id) => {
    this.props.setVisible("recordModal", id);
  };

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="4">
                <h3>Expedientes( {this.props.api.rfcItem.code} )</h3>
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
                    this.showRecordModal(0);
                  }}
                >
                  Agregar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(this.props.api.recordList) &&
            this.props.api.recordList.length > 0
              ? this.props.api.recordList.map((record) => {
                  return (
                    <tr>
                      <td style={{ fontSize: 18, color: "#007bff" }}>
                        {record.code}
                      </td>
                      <td style={{ textAlign: "center", width: "50%" }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.props.apiGet("recordItem", record.id);
                            this.showRecordModal(record.id);
                          }}
                        >
                          Editar
                        </button>
                       &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.props.apiDelete("recordItem",  {id: record.id, rfc_id: record.rfc.id} );
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
          <ReduxComponents.RecordModal />
        </Provider>
      </React.Fragment>
    );
  }
}
export default withRouter(Record);
