import React, { useEffect, useState } from "react";
import { Spin, Divider, Switch } from "antd";
import axios from "config/axios";
import ErrorBoundary from "components/common/ErrorBoundary";
import { addSubLevelList, mulSubLevelList } from "config/const";

const StudentDetailsPopup = props => {
  const { user } = props;

  const [loading, setLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState();

  const [learningMode, setLearningMode] = useState(user.profile.student_learning_mode_id);

  useEffect(() => {
    setLearningMode(user.profile.student_learning_mode_id);
  }, []); // eslint-disable-line

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/student-details?learning_mode_id=${learningMode}&user_id=${user.id}`)
        .then(({ data }) => {
          setStudentDetails(data.data);
          setLoading(false);
        })
        .catch(error => {});
    }
    fetchData();
  }, [learningMode]); // eslint-disable-line

  const handleLearningMode = () => {
    setLearningMode(learningMode === 1 ? 2 : 1);
  };

  const setAddSubLearningMode = () => {
    setLearningMode(1);
  };

  const setMulDivLearningMode = () => {
    setLearningMode(2);
  };

  const activeLevelList = learningMode === 1 ? addSubLevelList : mulSubLevelList;
  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
        width: "100%"
      }}
    >
      <Spin />
    </div>
  ) : (
    <ErrorBoundary>
      <div className="student-details-wrapper">
        <div className="font-16 card-title-wrapper">
          <div className="title-text">{`${user.profile.last_name} ${user.profile.first_name}`}</div>
          <div className="icon-wrapper">
            <i className="icon-add-sub" onClick={() => setAddSubLearningMode()} />
            <Switch onChange={() => handleLearningMode()} checked={learningMode === 2} />
            <i className="icon-mul-div" onClick={() => setMulDivLearningMode()} />
          </div>

          {/* {user.profile.student_learning_mode === 1 ? " (+/-)" : " (x/÷)"} */}
        </div>
        <Divider />
        <p>
          Starting Level:{" "}
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {`${
              studentDetails.startingLevel === 0
                ? "Pl. Test"
                : activeLevelList[studentDetails.startingLevel]?.sort || "NA"
            }  ${activeLevelList[studentDetails.startingLevel]?.descriptors || ""}`}
          </span>
        </p>
        <p>
          Current Level:{" "}
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {`${
              studentDetails.currentLevel === 0
                ? "Pl. Test"
                : activeLevelList[studentDetails.currentLevel]?.sort || "NA"
            }  ${activeLevelList[studentDetails.currentLevel]?.descriptors || ""}`}
          </span>
        </p>
        <p>
          Gain:{" "}
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {studentDetails.gain} Levels
          </span>
        </p>
        <p>
          Starting date:{" "}
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {studentDetails.startingDate}
          </span>{" "}
        </p>
        <p>
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {studentDetails.completedSessions}
          </span>{" "}
          completed sessions
        </p>
        <p>
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {studentDetails.totalPracticeMinutes}
          </span>{" "}
          total minutes of practice
        </p>
      </div>
    </ErrorBoundary>
  );
};
export default StudentDetailsPopup;
