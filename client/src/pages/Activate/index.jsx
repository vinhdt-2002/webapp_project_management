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
    let created_date = new Date(dateMongo);
    let year = created_date.getFullYear();
    let month = created_date.getMonth() + 1;
    let date = created_date.getDate();
    let hour = created_date.getHours();
    let min = created_date.getMinutes();
    return `Time: ${date}/${month}/${year} at ${hour}:${min}`;
  }

  return (
    <div className="act">
      <div className="act__container">
        <div className="act__list">
          <div className="act__item-right">
            <h3 className="act__title">Activities</h3>
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
                        {convertDate(el.createdAt)} within project{" "}
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
