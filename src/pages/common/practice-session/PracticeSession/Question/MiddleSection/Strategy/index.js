import React from "react";
import LevelADoublesWithDice from "./Level-a-doubles-with-dice";
import DiceGroupsOfOne from "./DiceGroupsOfOne";
import LeveD2FivesIsTenWithDice from "./Level-d-2-fives-is-ten-with-dice";
import DiceFourGroup from "./DiceFourGroup";
import DiceThreeGroup from "./DiceThreeGroup";
import DiceSixGroup from "./DideSixGroup";
import DiceSevenGroup from "./DiceSevenGroup";
import LevelEDiceZeroGroups from "./Level-e-dice-zero-groups";
import LevelEDiceGorupsOfZero from "./Level-e-dice-gorups-of-zero";
import LevelKDoubleFoursIsEightWithDice from "./Level-k-double-fours-is-eight-with-dice";
import LevelHDiceFiveOne from "./Level-h-dice-five-one";
import LevelHDiceFiveTwoGroups from "./Level-h-dice-five-two-groups";
import LevelLKFiveThreeGropus from "./Level-lk-five-three-groups";
import TenFramesWithDoubles from "./TenFramesWithDoubles";
import FillInTheBlanks from "./FillInTheBlanks";

import NumberLines from "./NumberLines";
import DiceOneGroup from "./DiceOneGroup";
import LevelJDiceTenMinusOne from "./Level-j-dice-ten-minus-one";
import TenOnPlaceValueChart from "./TenOnPlaceValueChart";
import BeadsAddition from "./BeadsAddition";
import BeadsSubtraction from "./BeadsSubtraction";
import DoubleBarDiagrams from "./DoubleBarDiagrams";
import AreaModels from "./AreaModels";
import OpenArrays from "./OpenArrays";
import TenFramesX4 from "./TenFramesX4";
import TenFramesX3 from "./TenFramesX3";
import TenFramesAddition from "./TenFramesAddition";
import TenFramesSubtraction from "./TenFramesSubtraction";
import NinePatterns from "./NinePatterns";
import NinePatternsStageThree from "./NinePatternsStageThree";
import NinePatternsStageFour from "./NinePatternsStageFour";
import FiveIsHalfOfTen from "./FiveIsHalfOfTen";
import NinePatternsStageTwo from "./NinePatternsStageTwo";
import FingersTrick from "./FingersTrick";
import ClockFaces from "./ClockFaces";
import MissingAddEnds from "./MissingAddEnds";
import FiveIsHalfOfTenWithBeads from "./FiveisHalfOfTenWithBeads";
import NumberLinesDivision from "./NumberLinesDivision";
import GroupsOfTwelve from "./GroupsOfTwelve";
import ElevensPatterns from "./ElevensPatterns";
import DiceTenPlusTwo from "./DiceTenPlusTwo";
import DiceTenPlusOne from "./DiceTenPlusOne";
import DiceSixPlusSix from "./DiceSixPlusSix";
import BarDiagramDivision from "./BarDiagramDivision";
import FindDifference from "./FindDifference";
import FiftyGroupsStage1 from "./FiftyGroupsStage1";
import FiftyGroupsStage2 from "./FiftyGroupsStage2";
import DiceTenPlusFive from "./DiceTenPlusFive";
import TwentyGroups from "./TwentyGroups";
import DiceTenPlusTen from "./DiceTenPlusTen";
import DiceTwentyMinusOne from "./DiceTwentyMinusOne";

import DiceTwentyMinusTwo from "./DiceTwentyMinusTwo";
import DiceTwentyMinusThree from "./DiceTwentyMinusThree";

import DiceTenPlusFour from "./DiceTenPlusFour";
import DiceEightPlusEight from "./DiceEightPlusEight";
import DiceTenPlusThree from "./DiceTenPlusThree";
import QuartersFourCrossTwentyFive from "./QuartersFourCrossTwentyFiveStageOne";

import GroupsOfSeventeen from "./GroupsOfSeventeen";
import TwoDigitPlusMultipleOfTen from "./TwoDigitPlusMultipleOfTen";
import TwoDigitMinusMultipleOfTen from "./TwoDigitMinusMultipleOfTen";
import TwoDigitMinusTwoDigits from "./TwoDigitMinusTwoDigits";
import TwoDigitPlusTwoDigits from "./TwoDigitPlusTwoDigits";
import TwoDigitPlusTwoDigitsOfNine from "./TwoDigitPlusTwoDigitsOfNine";
import TwoDigitMinusTwoDigitsOfNine from "./TwoDigitMinusTwoDigitsOfNine";

import { strategyDetailBySlug } from "config/const";
import { addSubLevelList } from "config/const";

function Strategy(props) {
  //practice question test page

  const {
    questionDetails: {
      slug,
      first_factor,
      second_factor,
      math_operation_id,
      checkedField,
      level_title,
      level_id,
      answer,
      correct_answer
    },
    hintClickedCount,
    isShowHint,
    enteredAnswer,
    strategyDetails
  } = props;

  function strategyRender(slug) {
    switch (slug) {
      case strategyDetailBySlug["DOUBLES_WITH_DICE"].slug:
        return (
          <LevelADoublesWithDice
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_GROUPS_OF_ONE"].slug:
        return <DiceGroupsOfOne first_factor={first_factor} second_factor={second_factor} isShowHint={isShowHint} />;
      case strategyDetailBySlug["DICE_THREE_GROUP"].slug:
        return (
          <DiceThreeGroup
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_FOUR_GROUP"].slug:
        return (
          <DiceFourGroup
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["2_FIVES_IS_TEN_WITH_DICE"].slug:
        return (
          <LeveD2FivesIsTenWithDice first_factor={first_factor} second_factor={second_factor} isShowHint={isShowHint} />
        );
      case strategyDetailBySlug["DICE_SIX_GROUP"].slug:
        return (
          <DiceSixGroup
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_SEVEN_GROUP"].slug:
        return (
          <DiceSevenGroup
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_ZERO_GROUPS"].slug:
        return (
          <LevelEDiceZeroGroups
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_GROUPS_OF_ZERO"].slug:
        return (
          <LevelEDiceGorupsOfZero
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DOUBLE_FOURS_IS_EIGHT_WITH_DICE"].slug:
        return (
          <LevelKDoubleFoursIsEightWithDice
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_FIVE_ONE"].slug:
        return (
          <LevelHDiceFiveOne
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_FIVE_TWO_GROUPS"].slug:
        return (
          <LevelHDiceFiveTwoGroups
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_FIVE_THREE_GROUPS"].slug:
        return (
          <LevelLKFiveThreeGropus
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_ONE_GROUP"].slug:
        return (
          <DiceOneGroup
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DICE_TEN_MINUS_ONE_GROUP"].slug:
        return (
          <LevelJDiceTenMinusOne
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["TEN_FRAMES_DOUBLE_DICES"].slug:
        return (
          <TenFramesWithDoubles
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["TEN_FRAMES_X3"].slug:
        return (
          <TenFramesX3
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["TEN_FRAMES_X4"].slug:
        return (
          <TenFramesX4
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["FILL_IN_THE_BLANKS"].slug:
        return (
          <FillInTheBlanks
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["NUMBER_LINES"].slug:
        return (
          <NumberLines
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            answer={answer}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].slug:
        return (
          <TenOnPlaceValueChart
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART_NON_VISIBLE"].slug:
        return (
          <TenOnPlaceValueChart
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["BEADS_ADDITION"].slug:
        return (
          <BeadsAddition
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["BEADS_SUBTRACTION"].slug:
        return (
          <BeadsSubtraction
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["DOUBLE_BAR_DAIGRAMS"].slug:
        return (
          <DoubleBarDiagrams
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
          />
        );
      case strategyDetailBySlug["AREA_MODELS"].slug:
        return (
          <AreaModels
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
          />
        );
      case strategyDetailBySlug["OPEN_ARRAYS"].slug:
        return (
          <OpenArrays
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
          />
        );
      case strategyDetailBySlug["TEN_FRAMES_ADDITION"].slug:
        return (
          <TenFramesAddition
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={addSubLevelList[level_id].label}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["TEN_FRAMES_SUBTRACTION"].slug:
        return (
          <TenFramesSubtraction
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={level_title}
            hintClickedCount={hintClickedCount}
          />
        );
      case strategyDetailBySlug["NINE_PATTERNS_STAGE_ONE"].slug:
        return (
          <NinePatterns
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={level_title}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );
      case strategyDetailBySlug["NINE_PATTERNS_STAGE_TWO"].slug:
        return (
          <NinePatternsStageTwo
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={level_title}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );

      case strategyDetailBySlug["NINE_PATTERNS_STAGE_THREE"].slug:
        return (
          <NinePatternsStageThree
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={level_title}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );
      case strategyDetailBySlug["NINE_PATTERNS_STAGE_FOUR"].slug:
        return (
          <NinePatternsStageFour
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={level_title}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );

      case strategyDetailBySlug["FIVE_IS_HALF_OF_TEN"].slug:
        return (
          <FiveIsHalfOfTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            checkedField={checkedField}
            level_title={level_title}
            hintClickedCount={hintClickedCount}
          />
        );

      case strategyDetailBySlug["FINGERS_TRICK"].slug:
        return <FingersTrick first_factor={first_factor} isShowHint={isShowHint} />;
      case strategyDetailBySlug["CLOCK_FACES"].slug:
        return <ClockFaces first_factor={first_factor} />;

      case strategyDetailBySlug["MISSING_ADDEND"].slug:
        return (
          <MissingAddEnds
            first_factor={first_factor}
            hintClickedCount={hintClickedCount}
            second_factor={second_factor}
          />
        );

      case strategyDetailBySlug["FIVE_IS_HALF_OF_TEN_WITH_BEADS"].slug:
        return (
          <FiveIsHalfOfTenWithBeads first_factor={first_factor} second_factor={second_factor} isShowHint={isShowHint} />
        );

      case strategyDetailBySlug["DIVISION_NUMBER_LINE"].slug:
        return (
          <NumberLinesDivision
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );

      //Level M & N
      case strategyDetailBySlug["DICE_TEN_PLUS_ONE_GROUP"].slug:
        return (
          <DiceTenPlusOne
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );

      case strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].slug:
        return (
          <DiceTenPlusTwo
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );

      case strategyDetailBySlug["DICE_SIX_PLUS_SIX"].slug:
        return (
          <DiceSixPlusSix
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
          />
        );

      case strategyDetailBySlug["ELEVENS_PATTERNS"].slug:
        return (
          <ElevensPatterns
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );
      case strategyDetailBySlug["ELEVENS_PATTERNS_STAGE_2"].slug:
        return (
          <ElevensPatterns
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );
      case strategyDetailBySlug["GROUPS_OF_TWELVE"].slug:
        return (
          <GroupsOfTwelve
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            answer={correct_answer}
          />
        );

      case strategyDetailBySlug["BAR_DIAGRAM_DIVISION"].slug:
        return (
          <BarDiagramDivision
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
          />
        );
      case strategyDetailBySlug["FIND_DIFFERENCE"].slug:
        return (
          <FindDifference
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["FIFTY_GROUPS_STAGE_1"].slug:
        return (
          <FiftyGroupsStage1
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["FIFTY_GROUPS_STAGE_2"].slug:
        return (
          <FiftyGroupsStage2
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTenPlusFive
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTenPlusFive
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].slug:
        return (
          <QuartersFourCrossTwentyFive
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_TWO"].slug:
        return (
          <QuartersFourCrossTwentyFive
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["TWENTY_GROUPS"].slug:
        return (
          <TwentyGroups
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTenPlusTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTenPlusTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTwentyMinusOne
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTwentyMinusOne
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTwentyMinusTwo
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTwentyMinusTwo
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTwentyMinusThree
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTwentyMinusThree
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTenPlusFour
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTenPlusFour
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_ONE"].slug:
        return (
          <DiceEightPlusEight
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_TWO"].slug:
        return (
          <DiceEightPlusEight
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_ONE"].slug:
        return (
          <DiceTenPlusThree
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_TWO"].slug:
        return (
          <DiceTenPlusThree
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["GROUPS_OF_SEVENTEEN"].slug:
        return (
          <GroupsOfSeventeen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["TWO_DIGITS_PLUS_MULTIPLE_OF_TEN"].slug:
        return (
          <TwoDigitPlusMultipleOfTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["TWO_DIGITS_MINUS_MULTIPLE_OF_TEN"].slug:
        return (
          <TwoDigitMinusMultipleOfTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS"].slug:
        return (
          <TwoDigitPlusTwoDigits
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS"].slug:
        return (
          <TwoDigitMinusTwoDigits
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS_OF_NINE"].slug:
        return (
          <TwoDigitPlusTwoDigitsOfNine
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS_OF_NINE"].slug:
        return (
          <TwoDigitMinusTwoDigitsOfNine
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10"].slug:
        return (
          <TwoDigitPlusMultipleOfTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10"].slug:
        return (
          <TwoDigitMinusMultipleOfTen
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100"].slug:
        return (
          <TwoDigitPlusTwoDigits
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );

      case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100"].slug:
        return (
          <TwoDigitMinusTwoDigits
            first_factor={first_factor}
            second_factor={second_factor}
            math_opration={math_operation_id}
            isShowHint={isShowHint}
            hintClickedCount={hintClickedCount}
            enteredAnswer={enteredAnswer}
            answer={correct_answer}
            strategyDetails={strategyDetails}
          />
        );
      default:
        return null;
    }
  }
  return <div className="wrap">{strategyRender(slug)}</div>;
}

export default Strategy;
