import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "./Question";
import { addAnswer } from "../../../../../../redux/actions/quizAction";
const QuestionList = props => {
  const dispatch = useDispatch();

  const {
    key,
    activeQuestionList,
    nextLevel,
    // closeQuizTest,
    addQuestionToQuestionList
  } = props;
  const totalQuestionCount = activeQuestionList.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [wrongQuestionsId, setWrongQuestionsId] = useState([]);

  const [currentLevelWrongAnswersCount, setCurrentLevelWrongAnswersCount] = useState(0);

  const { userDetails } = useSelector(({ auth }) => auth);
  const { activeSubmissionDetails } = useSelector(({ quiz }) => quiz);

  const handleRightAnswer = (answer, questionDetails, replySecond) => {
    let updatedRightAnswerCount = rightAnswersCount + 1;

    let updatedCurrentQuestionIndex = currentQuestionIndex + 1;

    //common state updates
    setRightAnswersCount(updatedRightAnswerCount);
    // setCurrentQuestionIndex(updatedCurrentQuestionIndex);
    let currentLevelWrongCount = currentLevelWrongAnswersCount;

    if (questionDetails.is_attempted === 1) {
      currentLevelWrongCount = currentLevelWrongAnswersCount - 1;

      setWrongAnswersCount(wrongAnswersCount - 1);
      setCurrentLevelWrongAnswersCount(currentLevelWrongCount);
    }
    if (totalQuestionCount === updatedCurrentQuestionIndex) {
      setRightAnswersCount(0);
      setCurrentQuestionIndex(0);
      setWrongAnswersCount(0);
      nextLevel(currentLevelWrongCount, "Last Right");
    } else {
      setCurrentQuestionIndex(updatedCurrentQuestionIndex);
    }
    const isCorrect = questionDetails.level_id === 0 ? (answer === questionDetails.correct_answer ? 1 : 0) : 1;

    //STATIC auto_timeout_for_question
    const answerBody = {
      placement_test_submission_id: activeSubmissionDetails.id,
      question_id: questionDetails.question_id,
      answer: answer,
      is_correct: isCorrect,
      time_taken_in_secs: replySecond,

      auto_timeout_for_question: 20
    };
    dispatch(addAnswer(answerBody));
  };
  const handleWrongAnswer = (answer, questionDetails, replySecond) => {
    let updatedCurrentQuestionIndex;
    let updatedWrongAnswerCount;
    let currentLevelQuestions = [...activeQuestionList];

    // if (currentLevelWrongAnswersCount > 4) {
    //   closeQuizTest(questionDetails);
    // }
    //  else if (
    //   questionDetails.retry_count ===
    //   userDetails.profile.max_retry_count_to_attempt_question
    // ) {
    //   closeQuizTest(questionDetails);
    // } else {

    updatedCurrentQuestionIndex = currentQuestionIndex + 1;
    updatedWrongAnswerCount = wrongAnswersCount + 1;
    const addedQuestionList = activeQuestionList.filter(e => e.question_id === questionDetails.question_id);

    const index = wrongQuestionsId.findIndex(e => e.id === questionDetails.question_id);
    let currentLevelWrongCount = currentLevelWrongAnswersCount;
    if (index === -1) {
      currentLevelWrongCount = currentLevelWrongAnswersCount + 1;

      wrongQuestionsId.push({
        id: questionDetails.question_id
      });
      setWrongAnswersCount(updatedWrongAnswerCount);
      setCurrentLevelWrongAnswersCount(currentLevelWrongCount);
    }

    const updatedWrongQuestionIdList = [...wrongQuestionsId];
    setWrongQuestionsId(updatedWrongQuestionIdList);

    if (
      addedQuestionList.length < 2 &&
      updatedWrongAnswerCount <= 2

      // wrongQuestionsId.includes(currentQuestionId)
    ) {
      // CHANGE THIS REQUIRED
      let updatedQuestionDetails = Object.assign({}, questionDetails, {
        answer: answer,
        retry_count: +questionDetails.retry_count + 1,
        is_correct: 0,
        time_taken_in_secs: replySecond,
        is_attempted: 1
      });
   

      addQuestionToQuestionList(updatedQuestionDetails);

      currentLevelQuestions.push(updatedQuestionDetails);
    }

    if (currentLevelQuestions.length === updatedCurrentQuestionIndex) {
      setRightAnswersCount(0);
      setCurrentQuestionIndex(0);
      setWrongAnswersCount(0);
      nextLevel(currentLevelWrongCount, "Last Wrong");
    }

    // else if (currentLevelWrongAnswersCount > 2 && wrongAnswersCount > 3) {

    //   setRightAnswersCount(0);
    //   setCurrentQuestionIndex(0);
    //   setWrongAnswersCount(0);
    //   nextLevel();
    // } else if (
    //   totalQuestionCount === 4 &&
    //   currentLevelWrongAnswersCount >= 2 &&
    //   wrongAnswersCount >= 2
    // ) {
    //   setRightAnswersCount(0);
    //   setCurrentQuestionIndex(0);
    //   setWrongAnswersCount(0);
    //   nextLevel();
    // }
    setCurrentQuestionIndex(updatedCurrentQuestionIndex);
    // }

    //STATIC auto_timeout_for_question
    const answerBody = {
      placement_test_submission_id: activeSubmissionDetails.id,
      question_id: questionDetails.question_id,
      answer: answer,
      is_correct: 0,
      time_taken_in_secs: replySecond,
      auto_timeout_for_question: 20

      // retry_count: questionDetails.retry_count + 1,
    };
    dispatch(addAnswer(answerBody));
  };

  // const availableTimeToFluencyRate = userDetails.profile.max_timeout_correct_ans_secs *
  // availableTimeToFluencyRate
  const availableTimeToFluencyRate = userDetails.profile.max_timeout_correct_ans_secs * 3;
  return (
    <div key={key}>
      {activeQuestionList.length > 0 && (
        <Question
          key={currentQuestionIndex}
          activeQuestionList={activeQuestionList}
          questionDetails={activeQuestionList[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          duration={availableTimeToFluencyRate}
          wrongAnswer={handleWrongAnswer}
          rightAnswer={handleRightAnswer}
          // checkAnswerFn={checkAnswerFn}
        />
      )}
    </div>
  );
};

export default QuestionList;
