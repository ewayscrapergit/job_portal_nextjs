import React from "react";

export default function PopupLayout(props) {
  return props.trigger ? (
    <div className="report-popup">
      <div className="report-popup-inner">
        <button
          className="report-close-btn"
          onClick={() => props.setTrigger(false)}
          style={{
            borderRadius: 5,
            border: "none",
            color: "#fff",
            backgroundColor: "#393457",
          }}
        >
          ×
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
