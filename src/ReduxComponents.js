import { connect } from "react-redux";
import Org from "./Org.js";
import OrgModal from "./OrgModal.js";

import { createStore, combineReducers } from "redux";

export const setVisible = function (obj, value) {
  return { type: "visible", obj: obj, value: value };
};

export const setUpdated = function (obj, value) {
  return { type: "updated", obj: obj, value: value };
};

export const setValue = function (obj, value) {
  return { type: "value", obj: obj, value: value };
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
  };
};

var reducers = combineReducers({
  updated: updatedReducer,
  visible: visibleReducer,
  value: valueReducer,
});

var reduxComponents = {
  Org: connect(mapStateToProps, mapDispatchToProps)(Org),
  OrgModal: connect(mapStateToProps, mapDispatchToProps)(OrgModal),
  store: createStore(reducers),
};

export default reduxComponents;
