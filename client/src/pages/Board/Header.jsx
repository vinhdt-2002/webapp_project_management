import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createColumn } from "../../redux/thunk/column";
import CustomMoDel from "./CustomModel";
import ManagerMembers from "./ManagerMembers";

const Header = ({ project }) => {
  const [model, setModel] = useState(false);
  const [modelManagerMember, setModelManagerMember] = useState(false);
  const [data, setData] = useState({ title: "" });
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  function onChangeInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    dispatch(
      createColumn({
        token: auth.token,
        data: { ...data, project: project._id },
        idProject: project._id,
      })
    );
    close();
  }

  function close() {
    setModel(false);
    setData({
      title: "",
    });
  }

  function closeModelManagerMember() {
    setModelManagerMember(false);
  }

  return (
    <div className="header">
      {modelManagerMember && <ManagerMembers close={closeModelManagerMember} />}
      {model && (
        <CustomMoDel
          close={close}
          data={data}
          onChangeInput={onChangeInput}
          onSubmit={onSubmit}
        />
      )}
      <div className="top">
        <div className="info">
          <h2 className="name">
            <span>
              <Link to={"/board"}>Board</Link>
            </span>{" "}
            / <span className="active">{project?.title}</span>
          </h2>
          <p className="dec">{project?.dec}</p>
        </div>
        <div className="members">
          {project?.members.slice(0, 4).map((e, i) => {
            return (
              <div className="avatar" key={i}>
                <img src={e.avatar} alt="" />
              </div>
            );
          })}
          {project?.members.length > 4 && (
            <div className="avatar">
              <div className="more">+{project?.members.length - 4}</div>
            </div>
          )}
        </div>
      </div>
      <div className="bot">
        <div className="left">
          <a href="/" className="active">
            Board
          </a>
        </div>
        <div className="right">
          <button onClick={() => setModel(true)} className="btn contain">
            <i className="bx bx-plus"></i>
            Add
          </button>
          <button
            onClick={() => setModel(true)}
            className="btn bg-red text-pink"
          >
            <i className="bx bx-minus"></i>
            Delete
          </button>
          {project?.admins.includes(auth.user._id) && (
            <button onClick={() => setModelManagerMember(true)} className="btn">
              <p>Manage Members</p>
              <i className="bx bx-user-plus"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
