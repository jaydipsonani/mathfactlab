// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Card, Spin, Row, Col } from "antd";
// import axios from "config/axios";
// import ErrorBoundary from "components/common/ErrorBoundary";
// import { addSubLevelList, mulSubLevelList } from "config/const";

// const StudentStatusPopup = props => {
//   const { user, open } = props;

//   const [loading, setLoading] = useState(true);
//   const [studentStatus, setStudentStatus] = useState();
//   const { userDetails } = useSelector(({ auth }) => auth);

//   const { completed_sessions, level_lifter_count_at_failed, completed_sessions_without_level_up } =
//     userDetails?.profile?.student_status_controller;

//   const [completeSessionColor, setCompleteSessionColor] = useState("");
//   const [levelLifterFailedColor, setLevelLifterFailedColor] = useState("");
//   const [completeWithoutLevelUp, setCompleteWithoutLevelUp] = useState("");

//   const { completed_session_count, fail_level_lifter_submission_count, completed_session_without_level_up_count } =
//     studentStatus || {};

//   useEffect(() => {
//     if (open) {
//       async function fetchData() {
//         await axios
//           .get(`/student/activity-status/${user.id}`)
//           .then(({ data }) => {
//             setStudentStatus(data.data.status);
//             setLoading(false);
//           })
//           .catch(error => {});
//       }
//       fetchData();
//     }
//   }, [user.id, open]); // eslint-disable-line

//   useEffect(() => {
//     if (completed_session_count > completed_sessions?.min && completed_session_count < completed_sessions?.max) {
//       setCompleteSessionColor("card-grid-cell-data-secondary");
//     } else {
//       if (completed_session_count >= completed_sessions?.max) {
//         setCompleteSessionColor("card-grid-cell-data-primary");
//       }
//       if (completed_session_count <= completed_sessions?.min) {
//         setCompleteSessionColor("card-grid-cell-data-danger");
//       }
//     }

//     if (
//       fail_level_lifter_submission_count > level_lifter_count_at_failed?.min &&
//       fail_level_lifter_submission_count < level_lifter_count_at_failed?.max
//     ) {
//       setLevelLifterFailedColor("card-grid-cell-data-secondary");
//     } else {
//       if (fail_level_lifter_submission_count >= level_lifter_count_at_failed?.max) {
//         setLevelLifterFailedColor("card-grid-cell-data-danger");
//       }
//       if (fail_level_lifter_submission_count <= level_lifter_count_at_failed?.min) {
//         setLevelLifterFailedColor("card-grid-cell-data-primary");
//       }
//     }
//     if (
//       completed_session_without_level_up_count > completed_sessions_without_level_up?.min &&
//       completed_session_without_level_up_count < completed_sessions_without_level_up?.max
//     ) {
//       setCompleteWithoutLevelUp("card-grid-cell-data-secondary");
//     } else {
//       if (completed_session_without_level_up_count >= completed_sessions_without_level_up?.max) {
//         setCompleteWithoutLevelUp("card-grid-cell-data-danger");
//       }
//       if (completed_session_without_level_up_count <= completed_sessions_without_level_up?.min) {
//         setCompleteWithoutLevelUp("card-grid-cell-data-primary");
//       }
//     }

//     if (completed_sessions.is_on === false) {
//       setCompleteSessionColor("card-grid-cell-data-gray");
//     }
//     if (completed_sessions_without_level_up.is_on === false) {
//       setCompleteWithoutLevelUp("card-grid-cell-data-gray");
//     }
//     if (level_lifter_count_at_failed.is_on === false) {
//       setLevelLifterFailedColor("card-grid-cell-data-gray");
//     }
//   }, [
//     completed_session_count,
//     fail_level_lifter_submission_count,
//     completed_session_without_level_up_count,
//     completed_sessions,
//     level_lifter_count_at_failed,
//     completed_sessions_without_level_up
//   ]);

//   return loading ? (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "20vh",
//         width: "100%"
//       }}
//     >
//       <Spin />
//     </div>
//   ) : (
//     <ErrorBoundary>
//       <div className="status-controller-wrapper">
//         <Card bordered={false}>
//           <Row>
//             <Col span={12} className="card-grid-header">
//               {`${user.profile.first_name} ${user.profile.last_name}`}
//             </Col>
//             <Col span={12} className="card-grid-header-count text-header-center">
//               {user.profile.student_learning_mode_id === 2
//                 ? `${mulSubLevelList[user.profile.mul_div_level_id]?.label || "NA"} ${
//                     mulSubLevelList[user.profile.mul_div_level_id]?.descriptors || ""
//                   }`
//                 : `${addSubLevelList[user.profile.add_sub_level_id]?.label || "NA"} ${
//                     addSubLevelList[user.profile.add_sub_level_id]?.descriptors || ""
//                   }`}
//             </Col>
//           </Row>

//           <Row>
//             <Col span={12} className={`${completeSessionColor}`}>
//               Completed sessions in last 14 days:
//             </Col>
//             <Col span={12} className={`${completeSessionColor} flex-center`}>
//               {studentStatus && studentStatus.completed_session_count}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={12} className={`${levelLifterFailedColor}`}>
//               Failed Level Lifters at current level:
//             </Col>
//             <Col span={12} className={`${levelLifterFailedColor} flex-center`}>
//               {studentStatus && studentStatus.fail_level_lifter_submission_count}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={12} className={`${completeWithoutLevelUp} border-bottom-left-radius`}>
//               Number of completed sessions at current level without leveling up:
//             </Col>
//             <Col span={12} className={`${completeWithoutLevelUp} flex-center border-bottom-right-radius`}>
//               {studentStatus && studentStatus.completed_session_without_level_up_count}
//             </Col>
//           </Row>
//           {/* <Card.Grid hoverable={false} className="card-grid-header">
//             {`${user.profile.first_name} ${user.profile.last_name}`}
//           </Card.Grid>
//           <Card.Grid hoverable={false} className="card-grid-header-count">
//             {user.profile.student_learning_mode === 2
//               ? `${mulSubLevelList[user.profile.mul_div_level_id]?.label ||
//                   "NA"} ${mulSubLevelList[user.profile.mul_div_level_id]
//                   ?.descriptors || "NA"}`
//               : `${addSubLevelList[user.profile.add_sub_level_id]?.label ||
//                   "NA"} ${addSubLevelList[user.profile.add_sub_level_id]
//                   ?.descriptors || "NA"}`}
//           </Card.Grid>
//           <Card.Grid
//             hoverable={false}
//             className={`card-grid-cell-data-text ${completeSessionColor}`}
//           >
//             Completed sessions in last 14 days:
//           </Card.Grid>
//           <Card.Grid
//             hoverable={false}
//             className={`card-grid-cell-data ${completeSessionColor}`}
//           >
//             {studentStatus && studentStatus.completed_session_count}
//           </Card.Grid>
//           <Card.Grid
//             hoverable={false}
//             className={`card-grid-cell-data-text ${levelLifterFailedColor}`}
//           >
//             Failed Level Lifters at current level:
//           </Card.Grid>
//           <Card.Grid
//             hoverable={false}
//             className={`card-grid-cell-data ${levelLifterFailedColor}`}
//           >
//             {studentStatus && studentStatus.fail_level_lifter_submission_count}
//           </Card.Grid>
//           <Card.Grid
//             hoverable={false}
//             className={`card-grid-cell-data-text ${completeWithoutLevelUp}`}
//           >
//             Number of completed sessions at current level without leveling up:
//           </Card.Grid>
//           <Card.Grid
//             hoverable={false}
//             className={`card-grid-cell-data ${completeWithoutLevelUp}`}
//           >
//             {studentStatus &&
//               studentStatus.completed_session_without_level_up_count}
//           </Card.Grid> */}
//         </Card>
//       </div>
//     </ErrorBoundary>
//   );
// };
// export default StudentStatusPopup;

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin } from "antd";
import axios from "config/axios";
import { addSubLevelList, mulSubLevelList } from "config/const";
import { useSelector } from "react-redux";
import ErrorBoundary from "components/common/ErrorBoundary";
const StudentStatus = props => {
  const { user, open } = props;

  const [studentStatus, setStudentStatus] = useState();
  const { userDetails } = useSelector(({ auth }) => auth);
  const [loading, setLoading] = useState(true);
  const {
    profile: {
      ssc_level_lifter_count_is_on,
      ssc_level_lifter_count_range,
      ssc_completed_sessions_without_level_up_is_on,
      ssc_completed_sessions_without_level_up_range
    }
  } = userDetails;

  const [levelLifterFailedColor, setLevelLifterFailedColor] = useState("");
  const [completeWithoutLevelUp, setCompleteWithoutLevelUp] = useState("");

  const [minLevelLifter, maxLevelLifter] = ssc_level_lifter_count_range.split(":").map(Number);
  const [minCompletedWithoutLevelUp, maxCompletedWithoutLevelUp] = ssc_completed_sessions_without_level_up_range
    .split(":")
    .map(Number);

  const { level_lifter_failed_count, completed_sessions_without_level_up_count } = studentStatus || {};

  useEffect(() => {
    if (open) {
      setStudentStatus(Object.assign({}, user.status_stats));
    }
  }, [user.id, open]); // eslint-disable-line

  useEffect(() => {
    if (open) {
      async function fetchData() {
        await axios
          .get(`/student/activity-status/${user.id}`)
          .then(({ data }) => {
            setStudentStatus(data.data.status);
            setLoading(false);
          })
          .catch(error => {});
      }
      fetchData();
    }
  }, [user.id, open]); // eslint-disable-line
  useEffect(() => {
    // if (
    //   completed_session_count > minCompletedSessions &&
    //   completed_session_count < maxCompletedSessions
    // ) {
    //   setCompleteSessionColor("card-grid-cell-data-secondary");
    // } else {
    //   if (completed_session_count >= maxCompletedSessions) {
    //     setCompleteSessionColor("card-grid-cell-data-primary");
    //   }
    //   if (completed_session_count <= minCompletedSessions) {
    //     setCompleteSessionColor("card-grid-cell-data-danger");
    //   }
    // }

    if (level_lifter_failed_count > minLevelLifter && level_lifter_failed_count < maxLevelLifter) {
      setLevelLifterFailedColor("card-grid-cell-data-secondary");
    } else {
      if (level_lifter_failed_count >= maxLevelLifter) {
        setLevelLifterFailedColor("card-grid-cell-data-danger");
      }
      if (level_lifter_failed_count <= minLevelLifter) {
        setLevelLifterFailedColor("card-grid-cell-data-primary");
      }
    }

    if (
      completed_sessions_without_level_up_count > minCompletedWithoutLevelUp &&
      completed_sessions_without_level_up_count < maxCompletedWithoutLevelUp
    ) {
      setCompleteWithoutLevelUp("card-grid-cell-data-secondary");
    } else {
      if (completed_sessions_without_level_up_count >= maxCompletedWithoutLevelUp) {
        setCompleteWithoutLevelUp("card-grid-cell-data-danger");
      }
      if (completed_sessions_without_level_up_count <= minCompletedWithoutLevelUp) {
        setCompleteWithoutLevelUp("card-grid-cell-data-primary");
      }
    }

    if (ssc_completed_sessions_without_level_up_is_on === 0) {
      setCompleteWithoutLevelUp("card-grid-cell-data-gray");
    }
    if (ssc_level_lifter_count_is_on === 0) {
      setLevelLifterFailedColor("card-grid-cell-data-gray");
    }
  }, [
    ssc_level_lifter_count_is_on,
    ssc_completed_sessions_without_level_up_is_on,
    ssc_completed_sessions_without_level_up_range,
    ssc_level_lifter_count_range,
    minLevelLifter,
    maxLevelLifter,
    minCompletedWithoutLevelUp,
    maxCompletedWithoutLevelUp,
    level_lifter_failed_count,
    completed_sessions_without_level_up_count
  ]);

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
      <div className="status-controller-wrapper" key={user.id}>
        <Card bordered={false}>
          <Row>
            <Col span={12} className="card-grid-header">
              {`${user.profile.first_name} ${user.profile.last_name}`}
            </Col>
            <Col span={12} className="card-grid-header-count text-header-center">
              {user.profile.student_learning_mode_id === 2
                ? `${mulSubLevelList[user.profile.mul_div_level_id]?.label || "NA"} ${
                    mulSubLevelList[user.profile.mul_div_level_id]?.descriptors || ""
                  }`
                : `${addSubLevelList[user.profile.add_sub_level_id]?.label || "NA"} ${
                    addSubLevelList[user.profile.add_sub_level_id]?.descriptors || ""
                  }`}
            </Col>
          </Row>

          {/* <Row>
            <Col span={12} className={`${completeSessionColor}`}>
              Completed sessions in last 14 days:
            </Col>
            <Col span={12} className={`${completeSessionColor} flex-center`}>
              {studentStatus && studentStatus.completed_session_count}
            </Col>
          </Row> */}
          <Row>
            <Col span={12} className={`${levelLifterFailedColor}`}>
              Failed Level Lifters at current level:
            </Col>
            <Col span={12} className={`${levelLifterFailedColor} flex-center`}>
              {studentStatus && studentStatus.level_lifter_failed_count}
            </Col>
          </Row>
          <Row>
            <Col span={12} className={`${completeWithoutLevelUp} border-bottom-left-radius`}>
              Number of completed sessions at current level without leveling up:
            </Col>
            <Col span={12} className={`${completeWithoutLevelUp} flex-center border-bottom-right-radius`}>
              {studentStatus && studentStatus.completed_sessions_without_level_up_count}
            </Col>
          </Row>
          {/* <Card.Grid hoverable={false} className="card-grid-header">
            {`${user.profile.first_name} ${user.profile.last_name}`}
          </Card.Grid>
          <Card.Grid hoverable={false} className="card-grid-header-count">
            {user.profile.student_learning_mode === 2
              ? `${mulSubLevelList[user.profile.mul_div_level_id]?.label ||
                  "NA"} ${mulSubLevelList[user.profile.mul_div_level_id]
                  ?.descriptors || "NA"}`
              : `${addSubLevelList[user.profile.add_sub_level_id]?.label ||
                  "NA"} ${addSubLevelList[user.profile.add_sub_level_id]
                  ?.descriptors || "NA"}`}
          </Card.Grid>
          <Card.Grid
            hoverable={false}
            className={`card-grid-cell-data-text ${completeSessionColor}`}
          >
            Completed sessions in last 14 days:
          </Card.Grid>
          <Card.Grid
            hoverable={false}
            className={`card-grid-cell-data ${completeSessionColor}`}
          >
            {studentStatus && studentStatus.completed_session_count}
          </Card.Grid>
          <Card.Grid
            hoverable={false}
            className={`card-grid-cell-data-text ${levelLifterFailedColor}`}
          >
            Failed Level Lifters at current level:
          </Card.Grid>
          <Card.Grid
            hoverable={false}
            className={`card-grid-cell-data ${levelLifterFailedColor}`}
          >
            {studentStatus && studentStatus.fail_level_lifter_submission_count}
          </Card.Grid>
          <Card.Grid
            hoverable={false}
            className={`card-grid-cell-data-text ${completeWithoutLevelUp}`}
          >
            Number of completed sessions at current level without leveling up:
          </Card.Grid>
          <Card.Grid
            hoverable={false}
            className={`card-grid-cell-data ${completeWithoutLevelUp}`}
          >
            {studentStatus &&
              studentStatus.completed_session_without_level_up_count}
          </Card.Grid> */}
        </Card>
      </div>
    </ErrorBoundary>
  );
};
export default StudentStatus;
