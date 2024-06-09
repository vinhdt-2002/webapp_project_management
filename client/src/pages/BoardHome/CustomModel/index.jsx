import React from "react";
import Model from "../../../components/Model";

const CustomModel = ({ close, data, onChangeInput, onSubmit, txtBtn }) => {
  return (
    <Model close={close}>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Project Name"
            name="title"
            value={data.title}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-buildings"></i>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Project Description"
            name="dec"
            value={data.dec}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-captions"></i>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Logo"
            name="img"
            value={data.img}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-photo-album"></i>
        </div>
        <button>{txtBtn}</button>
      </form>
    </Model>
  );
};

export default CustomModel;
