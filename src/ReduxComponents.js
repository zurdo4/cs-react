import { connect } from "react-redux";
import Org from "./Org.js";
import OrgModal from "./OrgModal.js";
import axios from "axios";

import { createStore, combineReducers, applyMiddleware } from "redux";

export const setVisible = function (obj, value) {
  return { type: "visible", obj: obj, value: value };
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

export const apiReducer = function (
  state = { orgList: [], orgItem: { id: 0, code: "" } },
  action
) {
  if (action.type === "api-get") {
    switch (action.obj) {
      case "orgList":
        return Object.assign({}, state, { orgList: action.value });
      case "orgItem":
        return Object.assign({}, state, { orgItem: action.value });
      default:
        break;
    }
  }
  return state;
};

export const updatedReducer = function (
  state = { orgList_updated: false, orgModal_updated: false },
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

      default:
        break;
    }
  }

  return state;
};

export const valueReducer = function (
  state = { orgId_value: 0, orgCode_value: "" },
  action
) {
  if (action.type === "value") {
    switch (action.obj) {
      case "orgId":
        return Object.assign({}, state, { orgId_value: action.value });
      case "orgCode":
        return Object.assign({}, state, { orgCode_value: action.value });

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
          orgModal_visible: action.value,
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
  if (action.type === "api-get") {
    switch (action.obj) {
      case "orgList":
        axios
          .get("http://129.146.175.158:8080/cs/admin/orgs")
          .then((res) => {
            action.value = res.data;
            return next(action);
          })
          .catch((error) => console.log(error));
        break;

      case "orgItem":
        break;
      default:
        break;
    }
  }

  return next(action);
};

var reduxComponents = {
  Org: connect(mapStateToProps, mapDispatchToProps)(Org),
  OrgModal: connect(mapStateToProps, mapDispatchToProps)(OrgModal),
  store: createStore(reducers, applyMiddleware(api)),
};

export default reduxComponents;
