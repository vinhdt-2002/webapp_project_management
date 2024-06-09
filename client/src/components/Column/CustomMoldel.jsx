import React from "react";

import Model from "../Model";

const CustomMolDel = ({
  close,
  colors,
  colorChoice,
  setColorChoice,
  onSubmit,
  data,
  onChangeInput,
}) => {
  return (
    <Model close={close}>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Task Name"
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
            placeholder="Task Description"
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
            placeholder="Tag"
            name="tag"
            value={data.tag}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-label"></i>
        </div>
        <div className="color-choice">
          <h3>Choose Color: </h3>
          <ul>
            {colors.map((e, i) => (
              <li
                className={`bg-${e} ${colorChoice === e ? "active" : ""}`}
                key={i}
                onClick={() => setColorChoice(e)}
              >
                <i className="bx bx-check"></i>
              </li>
            ))}
          </ul>
        </div>
        <button>Add Task</button>
      </form>
    </Model>
  );
};

export default CustomMolDel;
