import React from "react";
import Model from "../../../components/Model";
import "./style.scss";

const CustomDeleteModel = ({ close, onClickDelete, msg }) => {
  return (
    <Model close={close}>
      <div className="model-delete">
        <h3>{msg}</h3>
        <div className="model-delete__btns row">
          <div className="col-6">
            <button onClick={onClickDelete} className="btn bg-red">
              Delete
            </button>
          </div>
          <div className="col-6">
            <button onClick={close} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Model>
  );
};

export default CustomDeleteModel;
