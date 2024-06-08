import React from "react";
import Model from "../../../components/Model";

const CustomTagModel = ({ close, data, onChangeInput, onSubmit }) => {
  return (
    <Model close={close}>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nhãn nhiệm vụ"
            name="tag"
            value={data.tag}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-label"></i>
        </div>
        <button>Cập nhật</button>
      </form>
    </Model>
  );
};

export default CustomTagModel;
