import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "./Question";
import { addLevelLifterAnswer } from "../../../../../redux/actions/practiceAction";

const TeacherQuestionList = props => {
  const dispatch = useDispatch();

  const {
    key,
    activeQuestionList,
    changeMathOperation,
    retakeQuestionCount,
    // addQuestionToQuestionList,
    activeMathOpration,
    updateWrongAnswerList,
    ShowInterviewReport,
    mathOperationKeyList
  } = props;
  const totalQuestionCount = activeQuestionList.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [wrongQuestionsId, setWrongQuestionsId] = useState([]);

  const { userDetails } = useSelector(({ auth }) => auth);
  const { levelLifterSubmissionDetails } = useSelector(({ strategy }) => strategy);
  const [errorCount, setErrorCount] = useState(0);
  // useEffect(() => {
  //   Object.keys(activeQuizLevelList).length &&
  //     setActiveQuestionList(activeQuestionList[0]);
  // }, activeQuizLevelList.length);

  const handleRightAnswer = (answer, questionDetails, replySecond) => {
    const { id: currentQuestionId } = questionDetails;

    //removed id if question is already answered wrong
    if (wrongQuestionsId.some(ans => ans.id === currentQuestionId)) {
      const updatedWrongQuestionIdList = wrongQuestionsId.filter(qns => qns.id !== currentQuestionId);

      setWrongQuestionsId(updatedWrongQuestionIdList);

      updateWrongAnswerList(updatedWrongQuestionIdList);
    }

    //////////////

    let updatedCurrentQuestionIndex = currentQuestionIndex + 1;

    if (totalQuestionCount === updatedCurrentQuestionIndex) {
      setCurrentQuestionIndex(0);
      changeMathOperation();
    } else {
      setCurrentQuestionIndex(updatedCurrentQuestionIndex);
    }
    // STATIC
    const answerBody = {
      level_lifter_test_submission_id: levelLifterSubmissionDetails.id,
      question_id: questionDetails.id,
      answer: answer,
      is_correct: 1,
      level_id: questionDetails.level_id,
      time_taken_in_secs: replySecond,
      max_timeout_correct_ans_secs: 4
    };

    dispatch(addLevelLifterAnswer(answerBody));
  };
  const handleWrongAnswer = async (answer, questionDetails, replySecond) => {
    // add id to wrong answer list
    const { id: currentQuestionId } = questionDetails;

    //ad wrong qns id to wrong answer list
    // if (!wrongQuestionsId.includes(currentQuestionId)) {
    // const updatedWrongQuestionIdList = [...wrongQuestionsId];
    // updatedWrongQuestionIdList.push({
    //   id: currentQuestionId,
    //   isCorrectButNotFluent:
    //     answer === questionDetails.correct_answer &&
    //     replySecond > userDetails.profile.max_timeout_correct_ans_secs,
    // });

    const index = wrongQuestionsId.findIndex(e => e.id === questionDetails.id);

    if (index === -1) {
      wrongQuestionsId.push({
        id: currentQuestionId,
        isCorrectButNotFluent:
          answer === questionDetails.correct_answer && replySecond > userDetails.profile.max_timeout_correct_ans_secs
      });
    } else {
      wrongQuestionsId[index] = {
        id: currentQuestionId,
        isCorrectButNotFluent:
          answer === questionDetails.correct_answer && replySecond > userDetails.profile.max_timeout_correct_ans_secs
      };
    }

    const updatedWrongQuestionIdList = [...wrongQuestionsId];
    setWrongQuestionsId(updatedWrongQuestionIdList);

    //update wrong answer list
    updateWrongAnswerList(updatedWrongQuestionIdList);

    /////////////////////////
    let updatedCurrentQuestionIndex = currentQuestionIndex + 1;
    let updatedErrorCount = errorCount + 1;

    const addedQuestionList = activeQuestionList.filter(e => e.id === questionDetails.id);
    // Add question for retakes
    if (
      updatedErrorCount <= retakeQuestionCount &&
      addedQuestionList.length < 2
      // !wrongQuestionsId.includes(currentQuestionId)
    ) {
      // let updatedQuestionDetails = Object.assign(questionDetails, {
      //   answer: answer,
      //   is_correct: 0,
      //   time_taken_in_secs: replySecond,
      //   is_attempted: 1,
      // });
      // await addQuestionToQuestionList(updatedQuestionDetails);
    }
    // Add question for retakes

    if (
      totalQuestionCount === updatedCurrentQuestionIndex

      // updatedErrorCount >= retakeQuestionCount
      // wrongQuestionsId.includes(currentQuestionId)
    ) {
      setCurrentQuestionIndex(0);
      changeMathOperation();
    }
    //  setCurrentQuestionIndex(currentQuestionIndex + 1);

    setCurrentQuestionIndex(updatedCurrentQuestionIndex);
    setErrorCount(updatedErrorCount);
    // STATIC
    const answerBody = {
      level_lifter_test_submission_id: levelLifterSubmissionDetails.id,
      question_id: questionDetails.id,
      answer: answer,
      is_correct: 0,
      level_id: questionDetails.level_id,
      time_taken_in_secs: replySecond,
      max_timeout_correct_ans_secs: 4
    };

    dispatch(addLevelLifterAnswer(answerBody));
  };

  return (
    <div key={key}>
      {activeQuestionList.length > 0 && (
        <Question
          key={currentQuestionIndex}
          activeQuestionList={activeQuestionList}
          questionDetails={activeQuestionList[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          duration={userDetails.profile.auto_timeout_for_question || 10}
          wrongAnswer={handleWrongAnswer}
          rightAnswer={handleRightAnswer}
          changeMathOperation={changeMathOperation}
          activeMathOpration={activeMathOpration}
          ShowInterviewReport={ShowInterviewReport}
          mathOperationKeyList={mathOperationKeyList}
          // checkAnswerFn={checkAnswerFn}
        />
      )}
    </div>
  );
};

export default TeacherQuestionList;
