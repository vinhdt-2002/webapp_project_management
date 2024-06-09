import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTaskComment } from "../../../redux/thunk/column";
import CommentItem from "./CommentItem";
import "./style.scss";

const Comment = () => {
  const { task, project, auth } = useSelector((state) => state);
  const [value, setValue] = useState("");
  const [showComments, setShowComments] = useState(true);
  const dispatch = useDispatch();
  const arrComments = [...task.data.comments];

  function onSubmitComment() {
    dispatch(
      createTaskComment({
        data: { content: value },
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
        content: `commented on the card ${task.data.title}`,
      })
    );
    setValue("");
  }

  return (
    <div className="comment">
      <div className="comment__header-container">
        <h3 className="comment__header">Comments</h3>
        <div className="comment__toggle">
          {showComments ? (
            <button
              className="btn toggle"
              onClick={() => setShowComments(false)}
            >
              Hide
            </button>
          ) : (
            <button
              className="btn toggle"
              onClick={() => setShowComments(true)}
            >
              Show
            </button>
          )}
        </div>
      </div>
      <div className="comment__input">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Comment on this task"
          style={{ resize: "none" }}
        ></textarea>
        <div className="comment__input-btns">
          <div>
            <i className="bx bx-smile"></i>
          </div>
          <div>
            <i className="bx bx-link-alt"></i>
          </div>
          <button className="btn contain" onClick={onSubmitComment}>
            Comment
          </button>
        </div>
      </div>
      {showComments && (
        <div className="comment__list">
          {arrComments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((el, i) => (
              <CommentItem key={i} comment={el} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
