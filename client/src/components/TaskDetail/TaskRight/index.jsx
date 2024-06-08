import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import "../TaskList/Calender.scss";
import "../TaskList/DatePicker.scss";
import CustomDecModel from "./CustomDecModel";
import CustomTagModel from "./CustomTagModel";
import CustomTitleModel from "./CustomTitleModel";
import "./style.scss";

import { updateTask } from "../../../redux/thunk/column";
import ManagerMemberTask from "./ManagerMembersTask";

const TaskRight = () => {
  const [modelManagerMember, setModelManagerMember] = useState(false);
  const dispatch = useDispatch();
  const { auth, project, task } = useSelector((state) => state);

  const [value, setValue] = useState(null);
  const [titleModel, setTitleModel] = useState(false);
  const [dataTitle, setDataTitle] = useState({ title: "" });
  const [decModel, setDecModel] = useState(false);
  const [dataDec, setDataDec] = useState({ dec: "" });
  const [tagModel, setTagModel] = useState(false);
  const [dataTag, setDataTag] = useState({ tag: "" });
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (task.data) {
      setValue(task.data.deadline ? new Date(task.data.deadline) : null);
      setDataTitle({ title: task.data.title });
      setDataDec({ dec: task.data.dec });
      setDataTag({ tag: task.data.tag });
      updateRemainingTime(task.data.deadline);
    }
  }, [task.data]);

  const countWork = task.data?.works.length;
  const countWorkComplete = task.data?.works.filter(
    (el) => el.isComplete === true
  ).length;
  const progress =
    countWork === 0 ? 0 : ((countWorkComplete / countWork) * 100).toFixed(2);

  const onChangeInputDataTitle = (e) => {
    const { name, value } = e.target;
    setDataTitle({ ...dataTitle, [name]: value });
  };

  const onSubmitDataTitle = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        data: dataTitle,
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
      })
    );
    setTitleModel(false);
  };

  const onChangeInputDataDec = (e) => {
    const { name, value } = e.target;
    setDataDec({ ...dataDec, [name]: value });
  };

  const onSubmitDataDec = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        data: dataDec,
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
      })
    );
    setDecModel(false);
  };

  const onChangeDeadline = (e) => {
    setValue(e);
    dispatch(
      updateTask({
        data: { deadline: e },
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
      })
    );
    updateRemainingTime(e);
  };

  const onChangeInputDataTag = (e) => {
    const { name, value } = e.target;
    setDataTag({ ...dataTag, [name]: value });
  };

  const onSubmitDataTag = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        data: dataTag,
        token: auth.token,
        idProject: project.data._id,
        idTask: task.data._id,
      })
    );
    setTagModel(false);
  };

  const updateRemainingTime = (deadline) => {
    if (deadline) {
      const now = new Date();
      const timeDiff = new Date(deadline) - now;
      if (timeDiff > 0) {
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setRemainingTime(`Còn ${daysLeft} ngày`);
      } else {
        setRemainingTime("Đã quá hạn");
      }
    } else {
      setRemainingTime("Không giới hạn");
    }
  };

  function closeTitleModel() {
    setTitleModel(false);
  }

  function closeDecModel() {
    setDecModel(false);
  }

  function closeTagModel() {
    setTagModel(false);
  }

  function closeModelManagerMember() {
    setModelManagerMember(false);
  }

  return (
    <div className="taskRight">
      {modelManagerMember && (
        <ManagerMemberTask close={closeModelManagerMember} />
      )}
      {titleModel && (
        <CustomTitleModel
          close={closeTitleModel}
          data={dataTitle}
          onChangeInput={onChangeInputDataTitle}
          onSubmit={onSubmitDataTitle}
        />
      )}
      {decModel && (
        <CustomDecModel
          close={closeDecModel}
          data={dataDec}
          onChangeInput={onChangeInputDataDec}
          onSubmit={onSubmitDataDec}
        />
      )}
      {tagModel && (
        <CustomTagModel
          close={closeTagModel}
          data={dataTag}
          onChangeInput={onChangeInputDataTag}
          onSubmit={onSubmitDataTag}
        />
      )}

      <div className="taskRight__name">
        <div className="taskRight__name-icon">
          <i className="bx bx-copy-alt"></i>
        </div>
        <p>Tên nhiệm vụ</p>
      </div>
      <div className="taskRight__title ml-40">
        <p>{task.data.title}</p>
        <button className="btn contain" onClick={() => setTitleModel(true)}>
          Thay đổi
        </button>
      </div>

      <div className="separator"></div>

      <div className="taskRight__name">
        <div className="taskRight__name-icon">
          <i className="bx bx-captions"></i>
        </div>
        <p>Mô tả nhiệm vụ</p>
      </div>
      <div className="taskRight__dec ml-40">
        <p>{task.data.dec}</p>
        <button className="btn contain" onClick={() => setDecModel(true)}>
          Thay đổi
        </button>
      </div>

      <div className="separator"></div>

      <div className="taskRight__name">
        <div className="taskRight__name-icon">
          <i className="bx bx-group"></i>
        </div>
        <p>Thành viên</p>
      </div>
      <div className="taskRight__members ml-40">
        <div className="members">
          {task.data?.members.slice(0, 4).map((e, i) => (
            <div className="avatar" key={i}>
              <img src={e.avatar} alt="" />
            </div>
          ))}
          {task.data?.members.length > 4 && (
            <div className="avatar">
              <div className="more">+{task.data?.members.length - 4}</div>
            </div>
          )}
        </div>
        <button
          className="btn contain"
          onClick={() => setModelManagerMember(true)}
        >
          Quản lí
        </button>
      </div>

      <div className="separator"></div>

      <div className="taskRight__name">
        <div className="taskRight__name-icon">
          <i className="bx bx-flag"></i>
        </div>
        <p>Thời gian hoàn thành</p>
      </div>
      <div className="taskRight__date ml-40">
        <DatePicker value={value} onChange={onChangeDeadline} />
      </div>

      <div className="separator"></div>

      <div className="taskRight__name">
        <div className="taskRight__name-icon">
          <i className="bx bx-scatter-chart"></i>
        </div>
        <p>Tiến độ</p>
      </div>
      <div
        className="taskRight__progress"
        style={{ "--progress": `${progress}%` }}
      >
        <div className="taskRight__progress-item ml-40">
          <p>{progress}%</p>
        </div>
      </div>

      <div className="taskRight__params ml-40">
        <table className="taskRight__progress-table">
          <tbody>
            <tr>
              <th>Tổng số công việc</th>
              <td>{countWork}</td>
            </tr>
            <tr>
              <th>Đã hoành thành </th>
              <td>{countWorkComplete}</td>
            </tr>
            <tr>
              <th>Thời gian còn lại</th>
              <td>{remainingTime}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="separator"></div>

      <div className="taskRight__name">
        <div className="taskRight__name-icon">
          <i className="bx bx-label"></i>
        </div>
        <p>Nhãn</p>
      </div>
      <div className="taskRight__tag ml-40">
        <div className={`taskRight__tag-item bg-${task.data.color}`}>
          {task.data.tag}
        </div>
        <button className="btn contain" onClick={() => setTagModel(true)}>
          Thay đổi
        </button>
      </div>
    </div>
  );
};

export default TaskRight;
