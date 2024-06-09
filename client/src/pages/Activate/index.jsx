import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Loading/Spinner";
import { getApi } from "../../utils/api";
import "./style.scss";

const Activate = () => {
  const [activates, setActivates] = useState(null);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getApi("/activate", auth.token)
      .then((res) => {
        setActivates(res.data.activates);
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      });
  }, [auth.token]);

  function convertDate(dateMongo) {
    let createdDate = new Date(dateMongo);
    let month = createdDate.getMonth() + 1;
    let date = createdDate.getDate();
    let hour = createdDate.getHours();
    let min = createdDate.getMinutes();
    return `${date} month ${month} at ${hour}:${min}`;
  }

  return (
    <div className="act">
      <div className="act__container">
        <div className="act__list">
          <div className="act__item-right">
            <h3 className="act__title">Hoạt động</h3>
          </div>
          <div className="act__list-container">
            {activates ? (
              <>
                {activates.map((el) => (
                  <div
                    className="act__item"
                    key={el._id}
                    onClick={() => navigate(`/board/${el.project._id}`)}
                  >
                    <div className="act__item-left">
                      <div className="act__item-left__img">
                        <img src={el.userTarget.avatar} alt="" />
                      </div>
                    </div>
                    <div className="act__item-right">
                      <p>
                        <Link to={"/"}>{el.userTarget.username}</Link>
                        {` ${el.content}`}
                      </p>
                      <p>
                        {convertDate(el.createdAt)} - Trong dự án{" "}
                        <Link to={`/board/${el.project._id}`}>
                          {el.project.title}
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="act__spinner">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
