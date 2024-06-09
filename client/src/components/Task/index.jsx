import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../redux/thunk/column";
import "./style.scss";

const Task = ({ task, index }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countWork = task.works.length;
  const countWorkComplete = task.works.filter(
    (el) => el.isComplete === true
  ).length;
  const { auth, project } = useSelector((state) => state);

  let handleClick =
    task.members.findIndex((el) => el._id === auth.user._id) === -1
      ? () => {}
      : () => navigate(`task/${task._id}`);

  function handleDeleteTask(idTask) {
    dispatch(
      deleteTask({
        token: auth.token,
        idProject: project.data._id,
        idTask,
        content: `deleted task ${task.title}`,
      })
    );
  }

  function toggleDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  }

  function handleDropdownClick(e) {
    e.stopPropagation();
  }

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={handleClick}
          className={`task ${task._id === "loading" ? "loading" : ""} ${
            snapshot.isDragging ? `border-${task.color}` : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task__header">
            <div className={`task__header-tag bg-${task.color}`}>
              {task.tag}
            </div>
            <div
              className={`task__header-icon dropdown ${
                dropdownOpen ? "open" : ""
              }`}
              onClick={toggleDropdown}
            >
              <i className="bx bx-dots-horizontal-rounded"></i>
              {dropdownOpen && (
                <div
                  className="dropdown__content"
                  onClick={handleDropdownClick}
                >
                  <div
                    className="item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task._id);
                    }}
                  >
                    <i className="bx bx-trash"></i>
                    <p>Delete task</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="task__body">
            <h3 className="task__body-name">{task.title}</h3>
            <p className="task__body-dec">{task.dec}</p>
            {task.deadline && (
              <div className="task__body-date">
                <i className="bx bxs-flag"></i>
                <p>{task.deadline?.substring(0, 10)}</p>
              </div>
            )}
          </div>

          <div className="task__footer">
            <div className="members">
              {task.members.slice(0, 4).map((e, i) => {
                return (
                  <div className="avatar" key={i}>
                    <img src={e.avatar} alt="" />
                  </div>
                );
              })}
              {task.members.length > 4 && (
                <div className="avatar">
                  <div className="more">+{task.members.length - 4}</div>
                </div>
              )}
            </div>

            <div className="task__footer-right">
              <div className="task__footer-right__item">
                <i className="bx bx-check-circle"></i>
                <p>
                  {countWorkComplete}/{countWork}
                </p>
              </div>

              <div className="task__footer-right__item">
                <i className="bx bx-message-dots"></i>
                <p>{task.comments.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
