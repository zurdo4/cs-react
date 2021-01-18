import React from "react";

import Table from "react-bootstrap/Table";
import { Provider } from "react-redux";
import ReduxComponents from "./ReduxComponents.js";
import axios from "axios";

class Org extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  fetchData() {
    axios
      .get("http://129.146.175.158:8080/cs/admin/orgs")
      .then((res) => {
        this.setState({ data: res.data });
        console.log("fetching data");
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchData();
    this.props.setUpdated("orgList", true);
  }

  componentDidUpdate() {
    if (!this.props.updated.orgList_updated) {
      this.fetchData();
      this.props.setUpdated("orgList", true);
    }
  }

  showOrgModal = (id) => {
    this.props.setValue("orgId", id);
    this.props.setValue("orgCode", "");
    this.props.setVisible("orgModal", true);
    this.props.setUpdated("orgModal", false);
  };

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center", fontSize: "23px" }} colSpan="4">
                Unidades Organizacionales
              </th>
            </tr>
            <tr>
              <th colSpan="4">
                <button
                  onClick={() => {
                    this.showOrgModal(0);
                  }}
                >
                  Agregar Unidad
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((org) => {
              return (
                <tr>
                  <td>{org.id}</td>
                  <td>{org.code}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.showOrgModal(org.id);
                      }}
                    >
                      click
                    </button>
                  </td>
                </tr>
              );
            })}
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
