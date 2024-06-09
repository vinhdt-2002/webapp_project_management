import React from "react";
import Model from "../../../components/Model";

const CustomTitleModel = ({ close, data, onChangeInput, onSubmit }) => {
  return (
    <Model close={close}>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Task description"
            name="dec"
            value={data.dec}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-captions"></i>
        </div>
        <button>Update</button>
      </form>
    </Model>
  );
};

export default CustomTitleModel;
