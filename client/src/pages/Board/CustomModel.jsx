import React from "react";
import Model from "../../components/Model";

const CustomMoDel = ({ close, data, onChangeInput, onSubmit }) => {
  return (
    <Model close={close}>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter column name"
            name="title"
            value={data.title}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-columns"></i>
        </div>
        <button>Add column</button>
      </form>
    </Model>
  );
};

export default CustomMoDel;
