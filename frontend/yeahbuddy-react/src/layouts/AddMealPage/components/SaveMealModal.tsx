import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function SaveMealModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <button
              className="btn btn-outline-dark"
              onClick={props.toggle}
            >
              X
            </button>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
