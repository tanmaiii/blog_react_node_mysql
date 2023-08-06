import React, { useState } from "react";
import "./modal.scss";

export default function Modal({open, onClose, onYes ,children }) {
    
  return (
    open && <div className="modal-opacity">
      <div className="modal">
        <div className="modal-body">
          <p>
            {children}
          </p>
        </div>
        <div className="modal-control">
          <button className="close" onClick={onClose}>Close</button>
          <button className="yes" onClick={onYes}>Yes</button>
        </div>
      </div>
    </div>
  );
}
