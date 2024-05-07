import React from "react";
import CountUp from "react-countup";
import { isTablet } from "react-device-detect";

import { numberToStringNumber, pluralOfWords, ordinalAppendStringOfNumber } from "utils/helpers";
import { strategyDetailBySlug } from "config/const";
import { addSubLevelList } from "config/const";
import keypadIcon from "assets/images/keypad-icon-2.png";

const numWords = require("num-words");
const pluralize = require("pluralize");

const BottomSection = props => {
  // Add case of if there is exceptional case  bottom text in strategy
  const {
    questionDetails: { slug, second_factor, first_factor, correct_answer, level_id },
    questionDetails,
    wrongCount,
    seconds,
    handleSkipQuesion,
    prevScore,
    // practiceStrategyScore,
    practiceStrategyScore,
    isShowHint,
    isShowBottomSection,
    hintClickedCount,
    enteredAnswer,
    currentQuestionIndex,
    isChangeNumPadLayout,
    changeKeypadLayout
  } = props;
  const mathOprationImage = strategySlug => {
    let hintText = null;
    switch (strategySlug) {
      case strategyDetailBySlug["DICE_ZERO_GROUPS"].slug:
        return (hintText = `${
          strategyDetailBySlug["DICE_ZERO_GROUPS"].desc
        } ${numberToStringNumber(second_factor)}${pluralOfWords(second_factor)}`);

      case strategyDetailBySlug["2_FIVES_IS_TEN_WITH_DICE"].slug:
        return (hintText = (
          <span>
            <span className={`hint-text-outside-boarder ${isShowHint ? "hint-text-outside-boarder-visible" : ""}`}>{`${
              strategyDetailBySlug["2_FIVES_IS_TEN_WITH_DICE"].desc.split(" = ")[0]
            }`}</span>{" "}
            ={" "}
            {`${strategyDetailBySlug["2_FIVES_IS_TEN_WITH_DICE"].desc.split(" = ")[1]}
            `}
          </span>
        ));

      case strategyDetailBySlug["DOUBLES_WITH_DICE"].slug:
        return (hintText = `${strategyDetailBySlug["DOUBLES_WITH_DICE"].desc}`);

      case strategyDetailBySlug["DICE_FOUR_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_FOUR_GROUP"].desc}`);

      case strategyDetailBySlug["DICE_THREE_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_THREE_GROUP"].desc}`);

      case strategyDetailBySlug["DICE_SIX_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_SIX_GROUP"].desc}`);

      case strategyDetailBySlug["DICE_SEVEN_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_SEVEN_GROUP"].desc}`);

      case strategyDetailBySlug["DOUBLE_FOURS_IS_EIGHT_WITH_DICE"].slug:
        return (hintText = `${strategyDetailBySlug["DOUBLE_FOURS_IS_EIGHT_WITH_DICE"].desc}`);

      case strategyDetailBySlug["DICE_FIVE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_FIVE_ONE"].desc}`);

      case strategyDetailBySlug["DICE_FIVE_TWO_GROUPS"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_FIVE_TWO_GROUPS"].desc}`);

      case strategyDetailBySlug["DICE_FIVE_THREE_GROUPS"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_FIVE_THREE_GROUPS"].desc}`);

      case strategyDetailBySlug["DICE_GROUPS_OF_ZERO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_GROUPS_OF_ZERO"].desc}`);

      case strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].slug:
        return (hintText = `${strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].desc}`);

      case strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART_NON_VISIBLE"].slug:
        return (hintText = `${strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART_NON_VISIBLE"].desc}`);

      case strategyDetailBySlug["DOUBLE_BAR_DAIGRAMS"].slug:
        return (hintText = `${strategyDetailBySlug["DOUBLE_BAR_DAIGRAMS"].desc}`);

      case strategyDetailBySlug["DICE_ONE_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_ONE_GROUP"].desc} ${numberToStringNumber(second_factor)}`);

      case strategyDetailBySlug["DICE_TEN_MINUS_ONE_GROUP"].slug:
        return (hintText = `9 ${numberToStringNumber(
          second_factor
        )}${pluralOfWords(second_factor)} = 10 ${numberToStringNumber(
          second_factor
        )}${pluralOfWords(second_factor)} - 1 ${numberToStringNumber(second_factor)}`);

      case strategyDetailBySlug["FIVE_IS_HALF_OF_TEN"].slug:
        let uniqueFactor = first_factor === 5 ? second_factor : first_factor;

        if (uniqueFactor > 10) {
          return (hintText = (
            <span>
              5 groups is <b> half</b> of 10 groups.
            </span>
          ));
        } else if (uniqueFactor === 1) {
          return (hintText = (
            <span>
              {uniqueFactor} five is <b> half</b> of {uniqueFactor} ten.
            </span>
          ));
        } else {
          return (hintText = (
            <span>
              {uniqueFactor} fives is <b> half</b> of {uniqueFactor} tens.
            </span>
          ));
        }

      case strategyDetailBySlug["NINE_PATTERNS_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["NINE_PATTERNS_STAGE_ONE"].desc}`);

      case strategyDetailBySlug["NINE_PATTERNS_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["NINE_PATTERNS_STAGE_TWO"].desc}`);

      case strategyDetailBySlug["NINE_PATTERNS_STAGE_THREE"].slug:
        return (hintText = `${strategyDetailBySlug["NINE_PATTERNS_STAGE_THREE"].desc}`);

      case strategyDetailBySlug["NINE_PATTERNS_STAGE_FOUR"].slug:
        return (hintText = `${strategyDetailBySlug["NINE_PATTERNS_STAGE_FOUR"].desc}`);

      case strategyDetailBySlug["FINGERS_TRICK"].slug:
        return (hintText = `Drop the ${first_factor}${ordinalAppendStringOfNumber(first_factor)} finger.`);

      case strategyDetailBySlug["CLOCK_FACES"].slug:
        return (hintText = `How many minutes are in the ${first_factor} green sections?`);

      case strategyDetailBySlug["FIVE_IS_HALF_OF_TEN_WITH_BEADS"].slug:
        if (first_factor === 1) {
          return (hintText = (
            <span>
              {first_factor} five is <b> half</b> of {first_factor} ten.
            </span>
          ));
        } else {
          return (hintText = (
            <span>
              {first_factor} fives is <b> half</b> of {first_factor} tens.
            </span>
          ));
        }

      case strategyDetailBySlug["DIVISION_NUMBER_LINE"].slug:
        if (isShowHint) {
          if (hintClickedCount === 1) {
            // return (hintText = `The red dots are multiples of ${numberToStringNumber(
            //   second_factor,
            // )}.`);
            return (hintText = (
              <span>
                {first_factor} ={" "}
                <span
                  style={{
                    borderBottom: "2px solid",
                    display: "inline-block",
                    width: "28px",
                    marginRight: "4px"
                  }}
                ></span>{" "}
                x {second_factor}
              </span>
            ));
          } else {
            // return (hintText = `Use the number line to help you find ${first_factor}.`);
            return (hintText = (
              <span>
                {first_factor} ={" "}
                <span
                  style={{
                    borderBottom: "2px solid",
                    display: "inline-block",
                    width: "28px",
                    marginRight: "4px"
                  }}
                ></span>{" "}
                x {second_factor}
              </span>
            ));
          }
        } else {
          return (hintText = `Use the landmarks to help you find ${first_factor}.  
          `);
        }
      case strategyDetailBySlug["DICE_TEN_PLUS_ONE_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_ONE_GROUP"].desc}`);

      case strategyDetailBySlug["ELEVENS_PATTERNS"].slug:
        return (hintText = `${strategyDetailBySlug["ELEVENS_PATTERNS"].desc}`);

      case strategyDetailBySlug["ELEVENS_PATTERNS_STAGE_2"].slug:
        if (first_factor === 10) {
          return (hintText = <span>To multiply by 10, shift up one place value.</span>);
        } else if (first_factor === 11) {
          return (hintText = <span>10 groups + 1 group = 11 groups</span>);
        } else {
          return (hintText = <span>10 groups + 2 groups = 12 groups</span>);
        }

      case strategyDetailBySlug["DICE_SIX_PLUS_SIX"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_SIX_PLUS_SIX"].desc}`);

      case strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].desc}`);

      case strategyDetailBySlug["GROUPS_OF_TWELVE"].slug:
        switch (first_factor) {
          // code to be executed if num = 10
          case 1:
            return (hintText = `${strategyDetailBySlug["DICE_ONE_GROUP"].desc} ${numberToStringNumber(second_factor)}`);
          case 2:
            return (hintText = `${strategyDetailBySlug["DOUBLES_WITH_DICE"].desc}`);
          case 3:
            return (hintText = `${strategyDetailBySlug["DICE_THREE_GROUP"].desc}`);
          case 4:
            return (hintText = `${strategyDetailBySlug["DICE_FOUR_GROUP"].desc}`);
          case 5:
            //Custom strategy for only first factor 5 in groups of 12 #exceptional
            return (hintText = `5 groups = 4 groups + 1 group`);
          case 6:
            return (hintText = `${strategyDetailBySlug["DICE_SIX_GROUP"].desc}`);
          case 7:
            return (hintText = `${strategyDetailBySlug["DICE_FIVE_TWO_GROUPS"].desc}`);
          case 8:
            return (hintText = `${strategyDetailBySlug["DOUBLE_FOURS_IS_EIGHT_WITH_DICE"].desc}`);
          case 9:
            return (hintText = `9 ${numberToStringNumber(
              second_factor
            )}${pluralOfWords(second_factor)} = 10 ${numberToStringNumber(
              second_factor
            )}${pluralOfWords(second_factor)} - 1 ${numberToStringNumber(second_factor)}`);

          case 10:
            return (hintText = `${strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].desc}`);

          case 11:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_ONE_GROUP"].desc}`);

          case 12:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].desc}`);
          // code to be executed if num
          // doesn't match any cases
          default:
            return (hintText = `${strategyDetailBySlug["GROUPS_OF_TWELVE"].desc}`);
        }

      case strategyDetailBySlug["TEN_FRAMES_ADDITION"].slug:
        const levelTitle = addSubLevelList[level_id].label;
        switch (levelTitle) {
          // Near doubles cases
          case "Level G":
            return (hintText = `${first_factor > second_factor ? first_factor : second_factor} + ${
              first_factor > second_factor ? second_factor : first_factor
            } = ${first_factor > second_factor ? second_factor : first_factor} + ${
              first_factor > second_factor ? second_factor : first_factor
            } + 1`);

          case "Level H":
            return (hintText = `${first_factor} + ${second_factor} =  ${
              first_factor === 9 ? 10 : first_factor - 1
            } + ${second_factor === 9 ? 10 : second_factor - 1}
             `);

          default:
            return (hintText = ``);
        }

      case strategyDetailBySlug["BAR_DIAGRAM_DIVISION"].slug:
        if (!!enteredAnswer) {
          return (hintText = (
            <span className={enteredAnswer === correct_answer ? "success-text p-0" : ""}>
              {second_factor} {pluralize(numWords(+enteredAnswer), second_factor)} = {second_factor * enteredAnswer}
            </span>
          ));
        } else {
          return (hintText = (
            <span>
              {second_factor} x ? = {first_factor}
            </span>
          ));
        }
      case strategyDetailBySlug["FIND_DIFFERENCE"].slug:
        // Exceptional case if distance(answer) = 10
        if (correct_answer === "10") {
          return (hintText = `Notice that both ${second_factor} and ${first_factor} have the same ones digit.`);
        } else {
          if (currentQuestionIndex % 2 === 0) {
            return (hintText = `What is the difference between ${first_factor} and ${second_factor}?`);
          } else {
            return (hintText = `How far apart are ${second_factor} and ${first_factor}?`);
          }
        }
      case strategyDetailBySlug["FIFTY_GROUPS_STAGE_1"].slug:
        return (hintText = `${strategyDetailBySlug["FIFTY_GROUPS_STAGE_1"].desc}`);
      case strategyDetailBySlug["FIFTY_GROUPS_STAGE_2"].slug:
        return (hintText = `${strategyDetailBySlug["FIFTY_GROUPS_STAGE_2"].desc}`);

      case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].slug:
        return (hintText = (
          <span>
            <span className={`hint-text-outside-boarder ${isShowHint ? "hint-text-outside-boarder-visible" : ""}`}>{`${
              strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].desc.split(" = ")[0]
            }`}</span>{" "}
            ={" "}
            {`${strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].desc.split(" = ")[1]}
          `}
          </span>
        ));

      case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_TWO"].slug:
        return (hintText = (
          <span>
            <span className={`hint-text-outside-boarder ${isShowHint ? "hint-text-outside-boarder-visible" : ""}`}>{`${
              strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].desc.split(" = ")[0]
            }`}</span>{" "}
            ={" "}
            {`${strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].desc.split(" = ")[1]}
          `}
          </span>
        ));

      case strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE"].desc}`);

      case strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_TWO"].desc}`);
      case strategyDetailBySlug["TWENTY_GROUPS"].slug:
        return (hintText = `${strategyDetailBySlug["TWENTY_GROUPS"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_TWO"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_TWO"].desc}`);
      case strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_TWO"].desc}`);
      case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_TWO"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_TWO"].desc}`);

      case strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_TWO"].desc}`);

      case strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_ONE"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_ONE"].desc}`);
      case strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_TWO"].slug:
        return (hintText = `${strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_TWO"].desc}`);
      case strategyDetailBySlug["GROUPS_OF_SEVENTEEN"].slug:
        switch (first_factor) {
          // code to be executed if num = 10
          case 2:
            return (hintText = `${strategyDetailBySlug["DOUBLES_WITH_DICE"].desc}`);
          case 3:
            return (hintText = `${strategyDetailBySlug["DICE_THREE_GROUP"].desc}`);
          case 4:
            return (hintText = `${strategyDetailBySlug["DICE_FOUR_GROUP"].desc}`);
          case 5:
            //Custom strategy for only first factor 5 in groups of 12 #exceptional
            return (hintText = `5 groups = 4 groups + 1 group`);
          case 6:
            return (hintText = `${strategyDetailBySlug["DICE_SIX_GROUP"].desc}`);
          case 7:
            return (hintText = `${strategyDetailBySlug["DICE_FIVE_TWO_GROUPS"].desc}`);
          case 8:
            return (hintText = `${strategyDetailBySlug["DOUBLE_FOURS_IS_EIGHT_WITH_DICE"].desc}`);
          case 9:
            return (hintText = `9 ${numberToStringNumber(
              second_factor
            )}${pluralOfWords(second_factor)} = 10 ${numberToStringNumber(
              second_factor
            )}${pluralOfWords(second_factor)} - 1 ${numberToStringNumber(second_factor)}`);

          case 10:
            return (hintText = `${strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].desc}`);
          case 11:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_ONE_GROUP"].desc}`);
          case 12:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].desc}`);
          case 13:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP"].desc}`);
          case 14:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP"].desc}`);
          case 15:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE"].desc}`);
          case 16:
            return (hintText = `${strategyDetailBySlug["DICE_SIXTEEN_GROUPS"].desc}`);
          case 17:
            return (hintText = `${strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].desc}`);
          case 18:
            return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP"].desc}`);
          case 19:
            return (hintText = `${strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP"].desc}`);
          case 20:
            return (hintText = `${strategyDetailBySlug["DICE_TWENTY_GROUP"].desc}`);
          // code to be executed if num
          // doesn't match any cases
          default:
            return (hintText = `${strategyDetailBySlug["GROUPS_OF_TWELVE"].desc}`);
        }
      default:
        hintText = "";
    }
    return hintText;
  };

  const handleChangeKeypadLayout = () => {
    changeKeypadLayout();
  };
  // For Skip button put condition only wants to show on wrong count number

  let w = window.innerWidth;
  let h = window.innerHeight;

  return (
    <div className={isShowBottomSection ? "boxed-test-bottom" : "boxed-test-bottom hide-section"}>
      <p className="mb-0 font-20 bottom-main">
        {process.env.REACT_APP_ENV === "development" || process.env.REACT_APP_ENV === "staging" ? (
          <span className="score-left" style={{ fontWeight: 800, bottom: "48px" }}>
            {w + "  x  " + h}
          </span>
        ) : (
          <span className="score-left"></span>
        )}
        {/* <span className="pull-left-score">{practiceStrategyScore}</span> */}

        {isTablet && (
          <span>
            {isChangeNumPadLayout ? (
              <img
                src={keypadIcon}
                alt="keypadIcon"
                className="pull-left-score keypad-icon"
                onClick={() => handleChangeKeypadLayout()}
              />
            ) : (
              <img
                src={keypadIcon}
                alt="keypadIcon"
                className="pull-left-score keypad-icon-right"
                onClick={() => handleChangeKeypadLayout()}
              />
            )}
          </span>
        )}

        {(process.env.REACT_APP_ENV === "development" ||
          process.env.REACT_APP_ENV === "staging" ||
          sessionStorage.getItem("is_show_score") === "true") && (
          <>
            <CountUp
              className="pull-left-score"
              style={{ left: "30px" }}
              start={prevScore}
              end={practiceStrategyScore}
            />
          </>
        )}
        <span className="letter-space-3">{mathOprationImage(slug)}</span>
        <span
          className={
            isShowBottomSection
              ? "pull-right text-secondary flex-link"
              : "pull-right text-secondary flex-link on-middle-section"
          }
          onClick={() => handleSkipQuesion(questionDetails)}
          style={{
            visibility:
              wrongCount >= +process.env.REACT_APP_PRACTICE_TEST_WRONG_COUNT &&
              seconds >= +process.env.REACT_APP_HINT_SHOW_TIME
                ? "visible"
                : "hidden"
          }}
        >
          Skip <i className="icon-arrow-right"></i>
        </span>
      </p>
    </div>
  );
};

export default BottomSection;
