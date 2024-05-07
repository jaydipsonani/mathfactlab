import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "components/common/ErrorBoundary";
import AuthHeader from "components/dashboard/StudentAuthHeader";
import PracticeSession from "./PracticeSession";

import { getPracticeTestQuestionList } from "../../../redux/actions/practiceAction";
// import { Prompt } from "react-router";   CHANGE THIS REQUIRED

function PracticeSessionPage(props) {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  // const { userDetails } = useSelector(({ auth }) => auth);
  const { userDetails } = useSelector(state => state.auth);

  // const { fetchingPracticeTestQuestionListLoading } = useSelector(
  //     ({ strategy }) => strategy,
  // );
  const { fetchingPracticeTestQuestionListLoading } = useSelector(state => state.strategy);

  //For Reset data on page reload or tab close
  useBeforeunload(() => "You'll lose your data!");

  const slug = encodeURI(query.get("strategy-type"));
  //Fetch Question list by strategy

  const {
    profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id }
  } = userDetails;
  const levelId = student_learning_mode_id === 1 ? add_sub_level_id : mul_div_level_id;
  useEffect(() => {
    if (student_learning_mode_id && levelId) {
      slug &&
        dispatch(getPracticeTestQuestionList(slug.replace("%20", "+"), student_learning_mode_id, levelId, "", ""));
    }
  }, [slug]); // eslint-disable-line

  return (
    <>
      {/* <Prompt
                message={(location, action) => {
                    if (action === "POP") {
                        return `Do you wish to return to the dashboard?`;
                    }
                }}
            /> */}

      {fetchingPracticeTestQuestionListLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%"
          }}
        >
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <ErrorBoundary>
            <AuthHeader />
          </ErrorBoundary>

          <ErrorBoundary>
            <PracticeSession strategySlug={slug} />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

export default PracticeSessionPage;
