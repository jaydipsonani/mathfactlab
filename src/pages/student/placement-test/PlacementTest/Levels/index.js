import React, { useEffect, useState } from "react";

import Questions from "./Questions";
import LevelDirections from "./LevelDirectionTimer";

const LevelList = props => {
  const { activeQuizLevelList, changeMathOperation, activeMathOpration, activeMathOprationIndex } = props;

  const [isShowLevelDirectionTimer, setIsShowLevelDirectionTimer] = useState(true);

  const [activeQuizLevel, setActiveQuizLevel] = useState(0);
  const [activeQuestionList, setActiveQuestionList] = useState([]);
  const [mathOperationLevelErrorCount, setMathOperationLevelErrorCount] = useState({});

  useEffect(() => {
    if (Object.keys(activeQuizLevelList).length) {
      setActiveQuestionList(activeQuizLevelList[Object.keys(activeQuizLevelList)[activeQuizLevel]]);
    }
  }, [Object.values(activeQuizLevelList).join(","), activeQuizLevel]); // eslint-disable-line

  const handleChangeBreakLevel = updatedMathOprationResult => {
    //for div and sub start with level 1
    setActiveQuizLevel(1);
    setIsShowLevelDirectionTimer(true);
    changeMathOperation(activeQuizLevel, updatedMathOprationResult);
  };

  const handleChangeNextLevel = (quizLevel, fromWhere) => {
    let updatedMathOprationResult = {
      ...mathOperationLevelErrorCount,
      ...{
        [activeQuizLevel]: quizLevel || 0
      }
    };

    const totalErrorCountLevel = Object.values(updatedMathOprationResult).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    // #lastlevel
    // if (totalErrorCountLevel >= 5) {
    //   handleChangeBreakLevel(updatedMathOprationResult);
    //   setMathOperationLevelErrorCount({});
    //   updatedMathOprationResult = {};
    // }

    // Max level index based on math operation
    // let maxLevelId;
    // switch (userDetails) {
    // }

    let maxLevelId;
    let lastLevel;

    switch (activeMathOpration) {
      case "Addition":
        maxLevelId = 17;
        lastLevel = 26;
        break;
      case "Subtraction":
        maxLevelId = 17;
        lastLevel = 26;
        break;
      case "Multiplication":
        maxLevelId = 25;
        lastLevel = 26;
        break;
      case "Division":
        maxLevelId = 13;
        lastLevel = 26;
        break;
      default:
        maxLevelId = 12;
    }
    if (
      activeQuizLevel === maxLevelId ||
      totalErrorCountLevel >= 5
      // || activeQuizLevel === Object.keys(activeQuizLevelList).length - 1 || (activeQuizLevel === Object.keys(activeQuizLevelList).length - 1 && !activeQuizLevelList[activeQuizLevel + 1])
    ) {
      //for graduation we are adding last level + 1
      setActiveQuestionList([]);
      // #lastlevel
      changeMathOperation(lastLevel, updatedMathOprationResult);
      setActiveQuizLevel(1);
      setIsShowLevelDirectionTimer(true);
      updatedMathOprationResult = {};
    } else {
      // in division  at level E we dont have any questions so we are adding + 2 in else condition
      if (activeQuizLevelList[activeQuizLevel + 1] && activeQuizLevelList[activeQuizLevel + 1].length) {
        setActiveQuestionList(activeQuizLevelList[activeQuizLevel + 1]);
        setActiveQuizLevel(activeQuizLevel + 1);
      } else {
        setActiveQuestionList(activeQuizLevelList[activeQuizLevel + 2]);
        setActiveQuizLevel(activeQuizLevel + 2);
      }

      if (activeQuizLevel + 1 === 1) {
        setIsShowLevelDirectionTimer(true);
      }
    }
    // if(updatedMathOprationResult[activeMathOpration])

    setMathOperationLevelErrorCount(updatedMathOprationResult);
  };

  const addQuestionToQuestionList = questionDetails => {
    setActiveQuestionList([...activeQuestionList, questionDetails]);
  };

  const handleCloseTimer = () => {
    setIsShowLevelDirectionTimer(false);
  };

  return (
    <>
      {isShowLevelDirectionTimer ? (
        <LevelDirections
          closeLevelUpDirections={handleCloseTimer}
          upcomingLevelId={activeQuizLevel}
          activeMathOperation={activeMathOpration}
          activeMathOperationIndex={activeMathOprationIndex}
        />
      ) : (
        <Questions
          key={activeQuizLevel}
          activeQuestionList={activeQuestionList}
          nextLevel={handleChangeNextLevel}
          closeQuizTest={handleChangeBreakLevel}
          addQuestionToQuestionList={addQuestionToQuestionList}
        />
      )}{" "}
    </>
  );
};

export default LevelList;
