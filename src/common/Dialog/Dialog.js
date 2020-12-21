import React from "react";
import "./Dialog.css";

const Dialog = (props) => {
  return (
    <div id="dialog">
      <div id="dialog-content">
        <div id="dialog-text">{props.dialogText}</div>
        <div id="dialog-actions">
          <button
            type="button"
            id="dialog-ok"
            onClick={() => props.onOk(props.additionalData)}
          >
            OK
          </button>
          <button type="button" id="dialog-cancel" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
