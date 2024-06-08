import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Loading/Spinner";
import Comment from "../../components/TaskDetail/Comment";
import TaskList from "../../components/TaskDetail/TaskList";
import TaskRight from "../../components/TaskDetail/TaskRight";
import { initTask } from "../../redux/taskSlice";
import { getApi } from "../../utils/api";
import "./style.scss";

const TaskDetail = () => {
    const navigate = useNavigate();
    const { idTask } = useParams();
    const { auth, project, task } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (idTask === task.data?._id) {
            return;
        }
        dispatch(initTask(null));
        getApi(`project/${project.data?._id}/task/${idTask}`, auth.token)
            .then((res) => dispatch(initTask(res.data.task)))
            .catch((err) => {
                toast.error(err.response.data.err);
            });
    }, [idTask, project.data?._id, task.data?._id, auth.token, dispatch]);

    if (!task.data) {
        return (
            <div className="loading__spinner">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="taskDetail row">
            <div className="col-8">
                <div className="taskDetail__container">
                    <div className="taskDetail__container-btn">
                        <button
                            className="btn contain"
                            onClick={() => navigate(-1)}
                        >
                            <i className="bx bx-arrow-back"></i>
                            <p> Quay lại dự án</p>
                        </button>
                    </div>
                    <TaskList />
                    <div className="separator"></div>
                    <Comment />
                </div>
            </div>
            <div className="col-4">
                <div className="taskDetail__right">
                    <TaskRight />
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
