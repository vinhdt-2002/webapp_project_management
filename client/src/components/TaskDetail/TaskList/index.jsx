import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addWork, addWorkReplace } from "../../../redux/taskSlice";
import { postApi } from "../../../utils/api";
import CustomAddMoDel from "./CustomAddModel";
import TaskItem from "./TaskItem";
import "./style.scss";

const TaskList = () => {
  const { task, auth, project } = useSelector((state) => state);
  const [show, setShow] = useState(true);
  const [modelAdd, setModelAdd] = useState(false);
  const [data, setData] = useState({ title: "" });
  const dispatch = useDispatch();

  function onChangeInput(e) {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  }

  function close() {
    setModelAdd(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    setData({ title: "" });
    dispatch(addWork({ ...data, task: task.data._id }));
    postApi(
      `/project/${project.data._id}/task/${task.data._id}/work`,
      data,
      auth.token
    )
      .then((res) => dispatch(addWorkReplace(res.data.work)))
      .catch((err) => {
        toast.error(err.response.data.err);
      });
    let content = `đã thêm công việc ${data.title} trong thẻ ${task.data?.title}`;
    postApi("/activate", { content, project: project.data?._id }, auth.token);
    setModelAdd(false);
  }

  return (
    <div className="taskList">
      {modelAdd && (
        <CustomAddMoDel
          close={close}
          data={data}
          onChangeInput={onChangeInput}
          onSubmit={onSubmit}
          txtBtn="Thêm công việc"
        />
      )}
      <div className="taskList__title-container">
        <h2 className="taskList__title">
          Danh sách công việc <span>{task.data.countWork}</span>
        </h2>
      </div>
      <div className="taskList__controls">
        <button
          className="taskList__add btn toggle"
          onClick={() => setModelAdd(true)}
        >
          Thêm công việc
        </button>
        {show ? (
          <button className="btn toggle" onClick={() => setShow(false)}>
            Ẩn bớt
          </button>
        ) : (
          <button className="btn toggle" onClick={() => setShow(true)}>
            Hiển thị
          </button>
        )}
      </div>
      {show && (
        <ul className="taskList__works">
          {task.data.works.map((el, i) => (
            <TaskItem key={i} index={i + 1} workData={el} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
