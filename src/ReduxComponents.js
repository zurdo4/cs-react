import { connect } from "react-redux";
import Org from "./Org.js";
import OrgModal from "./OrgModal.js";
import Rfc from "./Rfc.js";
import RfcModal from "./RfcModal.js";
import Analyst from "./Analyst.js";
import AnalystModal from "./AnalystModal.js";
import Record from "./Record.js";
import RecordModal from "./RecordModal.js";
import axios from "axios";

import { createStore, combineReducers, applyMiddleware } from "redux";

export const setVisible = function (obj, value) {
  return { type: "visible", obj: obj, value: value };
};

export const setHidden = function (obj, value) {
  return { type: "hidden", obj: obj, value: value };
};

export const setUpdated = function (obj, value) {
  return { type: "updated", obj: obj, value: value };
};

export const setValue = function (obj, value) {
  return { type: "value", obj: obj, value: value };
};

export const apiGet = function (obj, value) {
  return { type: "api-get", obj: obj, value: value };
};

export const apiPost = function (obj, value) {
  return { type: "api-post", obj: obj, value: value };
};

export const apiPut = function (obj, value) {
  return { type: "api-put", obj: obj, value: value };
};

export const apiDelete = function (obj, value) {
  return { type: "api-delete", obj: obj, value: value };
};

export const apiReducer = function (
  state = {
    orgList: [],
    orgItem: { id: 0, code: "" },
    rfcList: [],
    rfcItem: { id: 0, code: "" },
    analystList: [],
    analystItem: { id: 0, code: "" },
    recordList: [],
    recordItem: { id: 0, code: "" },
  },
  action
) {
  if (action.type === "api-get") {
    switch (action.obj) {
      case "orgList":
        return Object.assign({}, state, { orgList: action.value });
      case "orgItem":
        return Object.assign({}, state, { orgItem: action.value });
      case "rfcList":
        return Object.assign({}, state, { rfcList: action.value });
      case "rfcItem":
        return Object.assign({}, state, { rfcItem: action.value });
      case "analystList":
        return Object.assign({}, state, { analystList: action.value });
      case "analystItem":
        return Object.assign({}, state, { analystItem: action.value });
      case "recordList":
        return Object.assign({}, state, { recordList: action.value });
      case "recordItem":
        return Object.assign({}, state, { recordItem: action.value });

      default:
        break;
    }
  }

  if (action.type === "api-post") {
    switch (action.obj) {
      case "orgItem":
        return Object.assign({}, state, { orgItem: action.value });
      case "analystItem":
        return Object.assign({}, state, { analystItem: action.value });
      default:
        break;
    }
  }
  return state;
};

export const updatedReducer = function (
  state = {
    orgList_updated: false,
    orgModal_updated: false,
    analystList_updated: false,
    analystModal_updated: false,
    rfcModal_updated: false,
    rfcList_updated: false,
    recordModal_updated: false,
    recordList_updated: false,
  },
  action
) {
  if (action.type === "updated") {
    switch (action.obj) {
      case "orgModal":
        return Object.assign({}, state, {
          orgModal_updated: action.value,
        });

      case "orgList":
        return Object.assign({}, state, {
          orgList_updated: action.value,
        });

      case "rfcModal":
        return Object.assign({}, state, {
          rfcModal_updated: action.value,
        });

      case "rfcList":
        return Object.assign({}, state, {
          rfcList_updated: action.value,
        });
      case "analystModal":
        return Object.assign({}, state, {
          analystModal_updated: action.value,
        });

      case "analystList":
        return Object.assign({}, state, {
          analystList_updated: action.value,
        });

      case "recordModal":
        return Object.assign({}, state, {
          recordModal_updated: action.value,
        });

      case "recordList":
        return Object.assign({}, state, {
          recordList_updated: action.value,
        });

      default:
        break;
    }
  }

  return state;
};

export const valueReducer = function (
  state = {
    orgId_value: 0,
    orgCode_value: "",
    rfcId_value: 0,
    rfcCode_value: "",
    analystId_value: 0,
    analystCode_value: "",
    recordId_value: 0,
    recordCode_value: "",
    message_value: "",
  },
  action
) {
  if (action.type === "value") {
    switch (action.obj) {
      case "orgId":
        return Object.assign({}, state, { orgId_value: action.value });
      case "orgCode":
        return Object.assign({}, state, { orgCode_value: action.value });
      case "rfcId":
        return Object.assign({}, state, { rfcId_value: action.value });
      case "rfcCode":
        return Object.assign({}, state, { rfcCode_value: action.value });
      case "analystId":
        return Object.assign({}, state, { analystId_value: action.value });
      case "analystCode":
        return Object.assign({}, state, { analystCode_value: action.value });
      case "recordId":
        return Object.assign({}, state, { recordId_value: action.value });
      case "recordCode":
        return Object.assign({}, state, { recordCode_value: action.value });
      case "message":
        return Object.assign({}, state, { message_value: action.value });
      default:
        break;
    }
  }

  return state;
};

export const visibleReducer = function (
  state = { orgModal_visible: false },
  action
) {
  if (action.type === "visible") {
    switch (action.obj) {
      case "orgModal":
        return Object.assign({}, state, {
          orgModal_visible: true,
        });

      case "rfcModal":
        return Object.assign({}, state, {
          rfcModal_visible: true,
        });

      case "analystModal":
        return Object.assign({}, state, {
          analystModal_visible: true,
        });

      case "recordModal":
          return Object.assign({}, state, {
            analystModal_visible: true,
          });

      default:
        break;
    }
  }
  if (action.type === "hidden") {
    switch (action.obj) {
      case "rfcModal":
        return Object.assign({}, state, {
          rfcModal_visible: false,
        });

      case "orgModal":
        return Object.assign({}, state, {
          orgModal_visible: false,
        });

      case "analystModal":
        return Object.assign({}, state, {
          analystModal_visible: false,
        });

      case "recordModal":
          return Object.assign({}, state, {
            analystModal_visible: false,
        });        

      default:
        break;
    }
  }
  return state;
};

var mapStateToProps = function (state) {
  return {
    updated: state.updated,
    visible: state.visible,
    value: state.value,
    api: state.api,
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
    setHidden: function (obj, value) {
      dispatch(setHidden(obj, value));
    },

    setVisible: function (obj, value) {
      dispatch(setVisible(obj, value));
    },
    setUpdated: function (obj, value) {
      dispatch(setUpdated(obj, value));
    },
    setValue: function (obj, value) {
      dispatch(setValue(obj, value));
    },
    apiPost: function (obj, value) {
      dispatch(apiPost(obj, value));
    },
    apiGet: function (obj, value) {
      dispatch(apiGet(obj, value));
    },
    apiPut: function (obj, value) {
      dispatch(apiPut(obj, value));
    },
    apiDelete: function (obj, value) {
      dispatch(apiDelete(obj, value));
    },
  };
};

var reducers = combineReducers({
  updated: updatedReducer,
  visible: visibleReducer,
  value: valueReducer,
  api: apiReducer,
});

export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

export const api = (store) => (next) => (action) => {
  if (action.type === "api-get" && action.obj === "orgList") {
    axios
      .get("http://129.146.175.158:8080/cs/admin/orgs")
      .then((res) => {
        action.value = res.data;
        return next(action);
      })
      .catch((error) => console.log(error));
    return;
  }

  if (action.type === "api-get" && action.obj === "rfcList") {
    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/rfcs?orgId=" + action.value)
        .then((res) => {
          action.value = res.data;
          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    }
    action.value = [];
    return next(action);
  }

  if (action.type === "api-get" && action.obj === "analystList") {
    if (action.value > 0) {
      axios
        .get(
          "http://129.146.175.158:8080/cs/admin/analysts?orgId=" + action.value
        )
        .then((res) => {
          action.value = res.data;
          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    }
    action.value = [];
    return next(action);
  }


  if (action.type === "api-get" && action.obj === "recordList") {
    if (action.value > 0) {
      axios
        .get(
          "http://129.146.175.158:8080/cs/admin/records?rfcId=" + action.value
        )
        .then((res) => {
          action.value = res.data;
          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    }
    action.value = [];
    return next(action);
  }

  

  if (action.type === "api-get" && action.obj === "rfcItem") {
    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/rfcs/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    }
    action.value = { id: 0, code: "" };

    return next(action);
  }

  if (action.type === "api-get" && action.obj === "orgItem") {
    axios
      .get("http://129.146.175.158:8080/cs/admin/orgs/" + action.value)
      .then((res) => {
        action.value = { id: res.data.id, code: res.data.code };
        return next(action);
      })
      .catch((error) => console.log(error));
    return;
  }

  if (action.type === "api-get" && action.obj === "analystItem") {
    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/analysts/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    }
    action.value = { id: 0, code: "" };
    return next(action);
  }

  if (action.type === "api-get" && action.obj === "recordItem") {
    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/records/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    }
    action.value = { id: 0, code: "" };
    return next(action);
  }





  if (action.type === "api-post" && action.obj === "orgItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/orgs", action.value)
      .then((res) => {
        store.dispatch(apiGet("orgList", []));
        store.dispatch(setHidden("orgModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-post" && action.obj === "rfcItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/rfcs", action.value)
      .then((res) => {
        store.dispatch(apiGet("rfcList", action.value.org_id));
        store.dispatch(setHidden("rfcModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-post" && action.obj === "analystItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/analysts", action.value)
      .then((res) => {
        store.dispatch(apiGet("analystList", action.value.org_id));
        store.dispatch(setHidden("analystModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-post" && action.obj === "recordItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/records", action.value)
      .then((res) => {
        store.dispatch(apiGet("recordList", action.value.rfc_id));
        store.dispatch(setHidden("recordModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }


  if (action.type === "api-delete" && action.obj === "orgItem") {
    axios
      .delete("http://129.146.175.158:8080/cs/admin/orgs/" + action.value)
      .then((res) => {
        store.dispatch(apiGet("orgList", []));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-delete" && action.obj === "rfcItem") {
    axios
      .delete("http://129.146.175.158:8080/cs/admin/rfcs/" + action.value.id)
      .then((res) => {
        store.dispatch(apiGet("rfcList", action.value.org_id));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-delete" && action.obj === "analystItem") {
    axios
      .delete(
        "http://129.146.175.158:8080/cs/admin/analysts/" + action.value.id
      )
      .then((res) => {
        store.dispatch(apiGet("analystList", action.value.org_id));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }


  if (action.type === "api-delete" && action.obj === "recordItem") {
    axios
      .delete(
        "http://129.146.175.158:8080/cs/admin/records/" + action.value.id
      )
      .then((res) => {
        store.dispatch(apiGet("recordList", action.value.rfc_id));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }


  if (action.type === "api-put" && action.obj === "orgItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/orgs", action.value)
      .then((res) => {
        store.dispatch(apiGet("orgList", []));
        store.dispatch(setHidden("orgModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-put" && action.obj === "rfcItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/rfcs", action.value)
      .then((res) => {
        store.dispatch(apiGet("rfcList", action.value.org_id));
        store.dispatch(setHidden("rfcModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  if (action.type === "api-put" && action.obj === "analystItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/analysts", action.value)
      .then((res) => {
        store.dispatch(apiGet("analystList", action.value.org_id));
        store.dispatch(setHidden("analystModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }


  if (action.type === "api-put" && action.obj === "recordItem") {
    axios
      .post("http://129.146.175.158:8080/cs/admin/records", action.value)
      .then((res) => {
        store.dispatch(apiGet("List", action.value.rfc_id));
        store.dispatch(setHidden("recordModal"));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }






  if (action.type === "visible" && action.obj === "orgModal") {
    store.dispatch(setValue("message", ""));

    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/orgs/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          store.dispatch(setValue("orgId", action.value.id));
          store.dispatch(setValue("orgCode", action.value.code));

          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    } else {
      action.value = { id: 0, code: "" };
      store.dispatch(setValue("orgId", action.value.id));
      store.dispatch(setValue("orgCode", action.value.code));

      return next(action);
    }
  }

  if (action.type === "visible" && action.obj === "rfcModal") {
    store.dispatch(setValue("message", ""));

    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/rfcs/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          store.dispatch(setValue("rfcId", action.value.id));
          store.dispatch(setValue("rfcCode", action.value.code));

          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    } else {
      action.value = { id: 0, code: "" };
      store.dispatch(setValue("rfcId", action.value.id));
      store.dispatch(setValue("rfcCode", action.value.code));
      return next(action);
    }
  }

  if (action.type === "visible" && action.obj === "analystModal") {
    store.dispatch(setValue("message", ""));

    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/analysts/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          store.dispatch(setValue("analystId", action.value.id));
          store.dispatch(setValue("analystCode", action.value.code));

          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    } else {
      action.value = { id: 0, code: "" };
      store.dispatch(setValue("analystId", action.value.id));
      store.dispatch(setValue("analystCode", action.value.code));
      return next(action);
    }
  }


  if (action.type === "visible" && action.obj === "recordModal") {
    store.dispatch(setValue("message", ""));

    if (action.value > 0) {
      axios
        .get("http://129.146.175.158:8080/cs/admin/records/" + action.value)
        .then((res) => {
          action.value = { id: res.data.id, code: res.data.code };
          store.dispatch(setValue("recordId", action.value.id));
          store.dispatch(setValue("recordCode", action.value.code));

          return next(action);
        })
        .catch((error) => console.log(error));
      return;
    } else {
      action.value = { id: 0, code: "" };
      store.dispatch(setValue("recordId", action.value.id));
      store.dispatch(setValue("recordCode", action.value.code));
      return next(action);
    }
  }






  return next(action);
};

var reduxComponents = {
  Org: connect(mapStateToProps, mapDispatchToProps)(Org),
  OrgModal: connect(mapStateToProps, mapDispatchToProps)(OrgModal),
  Rfc: connect(mapStateToProps, mapDispatchToProps)(Rfc),
  RfcModal: connect(mapStateToProps, mapDispatchToProps)(RfcModal),
  Analyst: connect(mapStateToProps, mapDispatchToProps)(Analyst),
  AnalystModal: connect(mapStateToProps, mapDispatchToProps)(AnalystModal),
  Record: connect(mapStateToProps, mapDispatchToProps)(Record),
  RecordModal: connect(mapStateToProps, mapDispatchToProps)(RecordModal),
  store: createStore(reducers, applyMiddleware(api)),
};

export default reduxComponents;
