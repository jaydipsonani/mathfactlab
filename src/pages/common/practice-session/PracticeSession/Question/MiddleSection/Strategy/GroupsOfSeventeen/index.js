import React from "react";
import TenOnPlaceValueChart from "../TenOnPlaceValueChart";
import NinePatternsStageTwo from "../NinePatternsStageTwo";
import DiceTenPlusOne from "../DiceTenPlusOne";
import DiceTenPlusTwo from "../DiceTenPlusTwo";
import DiceThreeGroup from "../DiceThreeGroup";
import DiceOneGroup from "../DiceOneGroup";
import DiceFourGroup from "../DiceFourGroup";
import DiceFiveGroup from "../DiceFiveGroup";
import LevelADoublesWithDice from "../Level-a-doubles-with-dice";
import DiceSixGroup from "../DideSixGroup";
import LevelKDoubleFoursIsEightWithDice from "../Level-k-double-fours-is-eight-with-dice";
import LevelJDiceTenMinusOne from "../Level-j-dice-ten-minus-one";
import OpenArrays from "../OpenArrays";
import DiceTenPlusFour from "../DiceTenPlusFour";
import DiceTenPlusFive from "../DiceTenPlusFive";
import DiceEightPlusEight from "../DiceEightPlusEight";
import DiceTwentyMinusTwo from "../DiceTwentyMinusTwo";
import DiceTwentyMinusOne from "../DiceTwentyMinusOne";
import DiceTenPlusTen from "../DiceTenPlusTen";
import DiceTenPlusThree from "../DiceTenPlusThree";

function GroupsOfSeventeen(props) {
  //practice question test page
  const { first_factor } = props;

  const renderStrategy = first_factor => {
    switch (first_factor) {
      // pass props as per require in strategy wise algorithm
      case 1:
        return <DiceOneGroup {...props} key="is equal ten" />;
      case 2:
        return <LevelADoublesWithDice {...props} key="is equal eleven" />;
      case 3:
        return <DiceThreeGroup {...props} key="is equal twelve" />;
      case 4:
        return <DiceFourGroup {...props} key="is equal ten" />;
      case 5:
        return <DiceFiveGroup {...props} key="is equal eleven" />;
      case 6:
        return <DiceSixGroup {...props} key="is equal twelve" />;
      case 7:
        return <OpenArrays {...props} key="is equal ten" />;
      case 8:
        return <LevelKDoubleFoursIsEightWithDice {...props} key="is equal eleven" />;
      case 9:
        return <LevelJDiceTenMinusOne {...props} key="is equal twelve" />;
      case 10:
        return <TenOnPlaceValueChart {...props} key="is equal ten" />;
      case 11:
        return <DiceTenPlusOne {...props} key="is equal eleven" />;
      case 12:
        return <DiceTenPlusTwo {...props} key="is equal twelve" />;
      case 13:
        return <DiceTenPlusThree {...props} key="is equal twelve" />;
      case 14:
        return <DiceTenPlusFour {...props} key="is equal twelve" />;
      case 15:
        return <DiceTenPlusFive {...props} key="is equal twelve" />;
      case 16:
        return <DiceEightPlusEight {...props} key="is equal twelve" />;
      case 17:
        return <OpenArrays {...props} key="is equal twelve" />;
      case 18:
        return <DiceTwentyMinusTwo {...props} key="is equal twelve" />;
      case 19:
        return <DiceTwentyMinusOne {...props} key="is equal twelve" />;
      case 20:
        return <DiceTenPlusTen {...props} key="is equal twelve" />;

      default:
        return <NinePatternsStageTwo {...props} key="is less ten" />;
    }
  };

  return <div>{renderStrategy(first_factor)}</div>;
}

export default GroupsOfSeventeen;
