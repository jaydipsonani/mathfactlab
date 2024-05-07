import ReactGA from "react-ga4";
import {
  strategyDetailBySlug,
  addSubLevelList,
  mulSubLevelList,
  addSubLevelFluencyRate,
  mulDivLevelFluencyRate
} from "../config/const";


export const setRoutes = config => {
  let routes = [...config.routes];

  if (config.settings || config.auth) {
    routes = routes.map(route => {
      let auth = config.auth ? [...config.auth] : null;
      auth = route.auth ? [...auth, ...route.auth] : auth;
      return {
        ...route,
        settings: { ...config.settings, ...route.settings },
        auth
      };
    });
  }

  return [...routes];
};
export const generateRoutesFromConfigs = configs => {
  let allRoutes = [];
  configs.forEach(config => {
    allRoutes = [...allRoutes, ...setRoutes(config)];
  });
  return allRoutes;
};

export const hasPermission = (authArr, userRole) => {
  /**
   * If auth array is not defined
   * Pass and allow
   */
  if (authArr === null || authArr === undefined) {
    // console.info("auth is null || undefined:", authArr);
    return true;
  } else if (authArr.length === 0) {
    /**
     * if auth array is empty means,
     * allow only user role is guest (null or empty[])
     */
    // console.info("auth is empty[]:", authArr);
    return !userRole || userRole.length === 0;
  } else {
    /**
     * Check if user has grants
     */
    // console.info("auth arr:", authArr);
    /*
              Check if user role is array,
              */
    if (userRole && Array.isArray(userRole)) {
      return authArr.some(r => userRole.indexOf(r) >= 0);
    }

    /*
              Check if user role is string,
              */
    return authArr.includes(userRole);
  }
};
export const stringTruncator = (string, length) => {
  return string.slice(0, length) + "...";
};

export const randomTwoDigitNumberGenerator = () => {
  let randomNumber = Math.floor(Math.random() * 90 + 10);
  if (randomNumber === 69) {
    return randomTwoDigitNumberGenerator();
  } else {
    return randomNumber;
  }
};

export const addLeadingZeros = (number, minLength) => {
  // Convert the number to a string
  let numberString = number.toString();

  // Calculate the number of leading zeros needed
  let zerosToAdd = minLength - numberString.length;

  // Add the leading zeros
  if (zerosToAdd > 0) {
    numberString = "0".repeat(zerosToAdd) + numberString;
  }

  return numberString;
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//remove temp key word from  email
export const removeInvitedEmail = email => {
  return email?.replace("INVITED_", "");
};
//captilize latter

export const questionToArray = questionDetails => {
  const { math_opration, question } = questionDetails;
  let mathOpration = "";
  switch (math_opration) {
    case 1:
      return question.split(" x ");
    default:
  }

  return mathOpration;
};

const stringOfnumber = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  21: "twentyone",
  22: "twentytwo",

  23: "twentythree",

  24: "twentyfour",

  25: "twentyfive"
};

export const numberToStringNumber = number => {
  return stringOfnumber[number];
};

export const pluralOfWords = number => {
  return number === 6 || number === 20 ? "es" : "s";
};

const ordinalNumbersAppendStringList = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
  5: "th",
  6: "th",
  7: "th",
  8: "th",
  9: "th",
  10: "th"
};

export const ordinalAppendStringOfNumber = number => {
  return ordinalNumbersAppendStringList[number];
};

export const checkIsHintAvailable = (strategySlug, first_factor, second_factor) => {
  switch (strategySlug) {
    case strategyDetailBySlug["DOUBLES_WITH_DICE"].slug:
      return 1;

    case strategyDetailBySlug["DICE_GROUPS_OF_ONE"].slug:
      return 0;

    case strategyDetailBySlug["DICE_THREE_GROUP"].slug:
      return 1;

    case strategyDetailBySlug["DICE_FOUR_GROUP"].slug:
      return 1;

    case strategyDetailBySlug["2_FIVES_IS_TEN_WITH_DICE"].slug:
      return 1;

    case strategyDetailBySlug["DICE_SIX_GROUP"].slug:
      return 1;

    case strategyDetailBySlug["DICE_SEVEN_GROUP"].slug:
      return 1;

    case strategyDetailBySlug["DICE_ZERO_GROUPS"].slug:
      return 0;

    case strategyDetailBySlug["DICE_GROUPS_OF_ZERO"].slug:
      return 0;

    case strategyDetailBySlug["DOUBLE_FOURS_IS_EIGHT_WITH_DICE"].slug:
      return 1;

    case strategyDetailBySlug["DICE_FIVE_ONE"].slug:
      return 1;

    case strategyDetailBySlug["DICE_FIVE_TWO_GROUPS"].slug:
      return 1;

    case strategyDetailBySlug["DICE_FIVE_THREE_GROUPS"].slug:
      return 1;

    case strategyDetailBySlug["DICE_ONE_GROUP"].slug:
      return 0;

    case strategyDetailBySlug["DICE_TEN_MINUS_ONE_GROUP"].slug:
      return 2;

    case strategyDetailBySlug["TEN_FRAMES_DOUBLE_DICES"].slug:
      if (second_factor === 10) {
        return 0;
      } else {
        return 1;
      }

    case strategyDetailBySlug["TEN_FRAMES_X3"].slug:
      return 2;

    case strategyDetailBySlug["TEN_FRAMES_X4"].slug:
      if (second_factor === 10) {
        return 0;
      } else {
        return 2;
      }
    case strategyDetailBySlug["FILL_IN_THE_BLANKS"].slug:
      if (second_factor === 1 || second_factor >= 11) {
        return 0;
      } else {
        return 1;
      }

    case strategyDetailBySlug["NUMBER_LINES"].slug:
      return 2;

    case strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART"].slug:
      return 1;

    case strategyDetailBySlug["TEN_ON_PLACE_VALUE_CHART_NON_VISIBLE"].slug:
      return 1;

    case strategyDetailBySlug["BEADS_ADDITION"].slug:
      if (first_factor === 0 || second_factor === 0) {
        return 0;
      } else {
        return 1;
      }
    case strategyDetailBySlug["BEADS_SUBTRACTION"].slug:
      if (second_factor === 0 || first_factor === second_factor) {
        return 0;
      } else {
        return 1;
      }

    case strategyDetailBySlug["DOUBLE_BAR_DAIGRAMS"].slug:
      return 1;

    case strategyDetailBySlug["AREA_MODELS"].slug:
      return 0;

    case strategyDetailBySlug["OPEN_ARRAYS"].slug:
      return 1;

    case strategyDetailBySlug["TEN_FRAMES_ADDITION"].slug:
      if (first_factor === 0 || second_factor === 0 || first_factor === 10 || second_factor === 10) {
        return 0;
      } else if ((first_factor === 9 && second_factor !== 8) || (first_factor !== 8 && second_factor === 9)) {
        return 2;
      } else {
        return 1;
      }

    case strategyDetailBySlug["TEN_FRAMES_SUBTRACTION"].slug:
      if (second_factor === 0) {
        return 0;
      } else {
        return 1;
      }
    case strategyDetailBySlug["NINE_PATTERNS_STAGE_ONE"].slug:
      return 1;

    case strategyDetailBySlug["NINE_PATTERNS_STAGE_TWO"].slug:
      return 1;

    case strategyDetailBySlug["NINE_PATTERNS_STAGE_THREE"].slug:
      return 1;

    case strategyDetailBySlug["NINE_PATTERNS_STAGE_FOUR"].slug:
      return 2;

    case strategyDetailBySlug["FIVE_IS_HALF_OF_TEN"].slug:
      return 1;

    case strategyDetailBySlug["FINGERS_TRICK"].slug:
      return 1;

    case strategyDetailBySlug["CLOCK_FACES"].slug:
      return 0;

    case strategyDetailBySlug["MISSING_ADDEND"].slug:
      if (second_factor === 0) {
        return 0;
      } else {
        return 1;
      }

    case strategyDetailBySlug["FIVE_IS_HALF_OF_TEN_WITH_BEADS"].slug:
      return 1;

    case strategyDetailBySlug["DIVISION_NUMBER_LINE"].slug:
      return 2;

    // Level M & N

    case strategyDetailBySlug["DICE_TEN_PLUS_ONE_GROUP"].slug:
      return 1;

    case strategyDetailBySlug["DICE_TEN_PLUS_TWO_GROUP"].slug:
      return 1;

    case strategyDetailBySlug["DICE_SIX_PLUS_SIX"].slug:
      return 1;

    case strategyDetailBySlug["ELEVENS_PATTERNS"].slug:
      if (first_factor > 9) {
        return 1;
      } else {
        return 0;
      }

    case strategyDetailBySlug["ELEVENS_PATTERNS_STAGE_2"].slug:
      if (first_factor > 9) {
        return 1;
      } else {
        return 0;
      }

    case strategyDetailBySlug["GROUPS_OF_TWELVE"].slug:
      switch (first_factor) {
        case 1:
          return 0;
        case 9:
          return 2;
        default:
          return 1;
      }

    case strategyDetailBySlug["BAR_DIAGRAM_DIVISION"].slug:
      return 0;
    case strategyDetailBySlug["FIND_DIFFERENCE"].slug:
      //subtraction strategy so answer = first_factor - second_factor
      let answer = first_factor - second_factor;

      // mid number is based on first factor For ex: if first factor is 11 then total number is 20 then mid number is 10
      let middleDifferenceNumber = Math.ceil(second_factor / 10) * 10;

      switch (answer) {
        case 1:
          return 0;
        case 2:
          return 1;
        default:
          if (second_factor < middleDifferenceNumber && first_factor > middleDifferenceNumber) {
            return 2;
          } else {
            return 1;
          }
      }
    case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE"].slug:
      return 1;
    case strategyDetailBySlug["QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_TWO"].slug:
      return 1;

    case strategyDetailBySlug["FIFTY_GROUPS_STAGE_1"].slug:
      return 1;
    case strategyDetailBySlug["FIFTY_GROUPS_STAGE_2"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE"].slug:
      return 1;

    case strategyDetailBySlug["DICE_TEN_PLUS_FIVE_GROUP_STAGE_TWO"].slug:
      return 1;
    case strategyDetailBySlug["TWENTY_GROUPS"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_ONE"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TWENTY_GROUP_STAGE_TWO"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_ONE"].slug:
      return 2;
    case strategyDetailBySlug["DICE_TWENTY_MINUS_ONE_GROUP_STAGE_TWO"].slug:
      return 2;
    case strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_ONE"].slug:
      return 2;
    case strategyDetailBySlug["DICE_TWENTY_MINUS_TWO_GROUP_STAGE_TWO"].slug:
      return 2;

    case strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_ONE"].slug:
      return 2;
    case strategyDetailBySlug["DICE_TWENTY_MINUS_THREE_GROUP_STAGE_TWO"].slug:
      return 2;
    case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_ONE"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP_STAGE_TWO"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_ONE"].slug:
      return 1;
    case strategyDetailBySlug["DICE_TEN_PLUS_FOUR_GROUP_STAGE_TWO"].slug:
      return 1;
    case strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_ONE"].slug:
      return 1;
    case strategyDetailBySlug["DICE_SIXTEEN_GROUPS_STAGE_TWO"].slug:
      return 1;
    // case strategyDetailBySlug["DICE_TEN_PLUS_THREE_GROUP"].slug:
    //   return 1;
    case strategyDetailBySlug["GROUPS_OF_SEVENTEEN"].slug:
      return 1;
    case strategyDetailBySlug["TWO_DIGITS_PLUS_MULTIPLE_OF_TEN"].slug:
      return 0;
    case strategyDetailBySlug["TWO_DIGITS_MINUS_MULTIPLE_OF_TEN"].slug:
      return 0;
    case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS"].slug:
      return 1;
    case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS"].slug:
      return 1;
    case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS_OF_NINE"].slug:
      return 1;
    case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS_OF_NINE"].slug:
      return 1;

    case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10"].slug:
      return 0;
    case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10"].slug:
      return 0;

    case strategyDetailBySlug["TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100"].slug:
      return 1;
    case strategyDetailBySlug["TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100"].slug:
      return 1;
    default:
      return null;
  }
};

// Score Progress bar color finder

export const getProgressClassNameByScore = score => {
  let progressClassName = "";

  switch (true) {
    case score >= 900 && score <= 1000:
      return (progressClassName = "dice-procolor-success");
    case score >= 600 && score <= 899:
      return (progressClassName = "dice-procolor-warning");
    case score >= 300 && score <= 599:
      return (progressClassName = "dice-procolor-info");
    case score <= 299:
      return (progressClassName = "dice-procolor-danger");
    default:
      progressClassName = "fail";
  }
  return progressClassName;
};

// export const getLevelLifterErrorCountByLevelID = level => {
//   //here error count we takes as correct but not fluent
//   let errorCount = 0;

//   // #lastlevel
//   if (level < 14) {
//     errorCount = 2;
//   }

//   return errorCount;
// };

export const allowedWhoopsiesByLevelLifterCount = levelLifterCount => {
  switch (levelLifterCount) {
    case 0:
      return 2;
    case 1:
      return 4;
    case 2:
      return 6;
    case 3:
      return 8;
    case 4:
      return 10;
    default:
      return 10;
  }
};

export const getLevelLifterErrorCountByUser = (whoopisiesLimitOrType, levelLifterCount) => {
  //here error count we takes as correct but not fluent
  let errorCount = 0;

  // if whoopisiesLimitOrType == "staggered" is then apply  allowed count as per levelifter count otherwise apply direct
  if (whoopisiesLimitOrType === "staggered") {
    errorCount = allowedWhoopsiesByLevelLifterCount(levelLifterCount);
  } else {
    errorCount = +whoopisiesLimitOrType;
  }

  return errorCount;
};

export const getLastLevelByLearningMode = currentLearningMode => {
  const lastLevelCount = Object.keys(currentLearningMode === 1 ? addSubLevelList : mulSubLevelList).slice(-1)[0];

  return +lastLevelCount;
};

export const getFluencyRateByLevel = (learningMode, levelId) => {
  if (learningMode === 1) {
    return addSubLevelFluencyRate[levelId];
  } else {
    return mulDivLevelFluencyRate[levelId];
  }
};

export const gaErrorLogger = (error, API_name) => {
  ReactGA.event({
    category: `${process.env.REACT_APP_ENV}: ${API_name} API Failed`,
    action: error?.response?.data?.message,
    label: `error_message:${error?.response?.data?.message}  --  error_message_server:${error?.message}`
  });
  return;
};

// roundToTwoDecimals

export const roundToTwoDecimals = num => {
  return Math.round(num * 100) / 100;
};

// check if email format is valid or not
export const isValidEmail = email => {
  // Regular expression for basic email format validation
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(email);
};
// check weather user is created from classlink sync or not
export const isNormalUser = userDetails => {
  return !userDetails?.school_district?.classlink_tenant_id;
};
