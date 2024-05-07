import React from "react";

export const autoTimeoutSecList = [
  { value: 10, label: "10 seconds" },
  { value: 15, label: "15 seconds" },
  { value: 20, label: "20 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 45, label: "45 seconds" },
  { value: 60, label: "60 seconds" }
];

export const retryCountList = [
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" }
];

export const maxTimeoutAnswerCountList = [
  { value: 2, label: "2 seconds" },
  { value: 3, label: "3 seconds" },
  { value: 4, label: "4 seconds" },
  { value: 5, label: "5 seconds" },
  { value: 6, label: "6 seconds" },
  { value: 8, label: "8 seconds" },
  { value: 10, label: "10 seconds" },
  { value: 15, label: "15 seconds" },
  { value: 20, label: "20 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 45, label: "45 seconds" },
  { value: 60, label: "60 seconds" },
  { value: 120, label: "120 seconds" }
];

export const devSessionTimeLimitList = [
  // { value: 1, label: "1 mins" },
  { value: 2, label: "2 mins" },
  { value: 3, label: "3 mins" },
  { value: 4, label: "4 mins" },
  { value: 5, label: "5 mins" },
  { value: 6, label: "6 mins" },
  { value: 7, label: "7 mins" },
  { value: 8, label: "8 mins" },
  { value: 9, label: "9 mins" },
  { value: 10, label: "10 mins" },
  { value: 11, label: "11 mins" },
  { value: 12, label: "12 mins" },
  { value: 13, label: "13 mins" },
  { value: 14, label: "14 mins" },
  { value: 15, label: "15 mins" },
  { value: 16, label: "16 mins" },
  { value: 17, label: "17 mins" },
  { value: 18, label: "18 mins" },
  { value: 19, label: "19 mins" },
  { value: 20, label: "20 mins" },
  { value: 500, label: "500 mins testing " }
  // { value: 1, label: "1 mins" },
  // { value: 2, label: "2 mins" },
  // { value: 3, label: "3 mins" },
  // { value: 4, label: "4 mins" },
  // { value: 5, label: "5 mins" },
];

export const studentSessionTimeLimitList = [
  { value: 5, label: "5 mins" },
  { value: 7.5, label: "7.5 mins" },
  { value: 10, label: "10 mins" },
  { value: 12.5, label: "12.5 mins" },
  { value: 15, label: "15 mins" },
  { value: 17.5, label: "17.5 mins" },
  { value: 20, label: "20 mins" }
];

export const booleanOptionsList = [
  { value: 1, label: "True" },
  { value: 0, label: "False" }
];

export const studentLearningModeList = [
  { value: 1, label: "Addition/Subtraction" },
  {
    value: 2,
    label: "Multiplication/Division"
    // disabled: process.env.REACT_APP_ENV === "production",
  }
];

export const levelLifterWhoopsiesList = [
  { value: "0", label: "0 whoopsies" },
  { value: "1", label: "1 whoopsies" },
  { value: "2", label: "2 whoopsies" },
  { value: "4", label: "4 whoopsies" },
  { value: "6", label: "6 whoopsies" },
  { value: "8", label: "8 whoopsies" },
  { value: "staggered", label: "Staggered (2, 4, 6, 8, 10)" }
];

export const addSubLevelList = {
  0: {
    value: 0,
    label: "Warm Up",
    sort: "-",
    isAvailable: false,
    descriptors: "",
    sortDescriptor: "",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "1",
        second_factor: "0",
        correct_answer: 1,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "1",
        correct_answer: 2,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "2",
        correct_answer: 3,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "3",
        correct_answer: 4,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "4",
        correct_answer: 5,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "5",
        correct_answer: 6,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "6",
        correct_answer: 7,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "7",
        correct_answer: 8,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "8",
        correct_answer: 9,
        math_opration: 1
      },

      {
        first_factor: "1",
        second_factor: "9",
        correct_answer: 10,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "10",
        correct_answer: 11,
        math_opration: 1
      }
    ]
  },
  1: {
    value: 1,
    label: "Level A",
    sort: "A",
    isAvailable: true,
    descriptors: "(+1)",
    sortDescriptor: "",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "1",
        second_factor: "0",
        correct_answer: 1,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "1",
        correct_answer: 2,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "2",
        correct_answer: 3,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "3",
        correct_answer: 4,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "4",
        correct_answer: 5,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "5",
        correct_answer: 6,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "6",
        correct_answer: 7,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "7",
        correct_answer: 8,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "8",
        correct_answer: 9,
        math_opration: 1
      },

      {
        first_factor: "1",
        second_factor: "9",
        correct_answer: 10,
        math_opration: 1
      },
      {
        first_factor: "1",
        second_factor: "10",
        correct_answer: 11,
        math_opration: 1
      }
    ]
  },
  2: {
    value: 2,
    label: "Level B",
    sort: "B",
    isAvailable: true,
    descriptors: "(+2)",
    sortDescriptor: "",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "2",
        second_factor: "0",
        correct_answer: 2,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "2",
        correct_answer: 4,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "3",
        correct_answer: 5,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "4",
        correct_answer: 6,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "5",
        correct_answer: 7,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "6",
        correct_answer: 8,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "7",
        correct_answer: 9,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "8",
        correct_answer: 10,
        math_opration: 1
      },
      {
        first_factor: "2",
        second_factor: "9",
        correct_answer: 11,
        math_opration: 1
      },

      {
        first_factor: "2",
        second_factor: "10",
        correct_answer: 12,
        math_opration: 1
      }
    ]
  },
  3: {
    value: 3,
    label: "Level C",
    sort: "C",
    isAvailable: true,
    descriptors: "(+0)",
    sortDescriptor: "",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "0",
        second_factor: "0",
        correct_answer: 0,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "3",
        correct_answer: 3,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "4",
        correct_answer: 4,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "5",
        correct_answer: 5,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "6",
        correct_answer: 6,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "7",
        correct_answer: 7,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "8",
        correct_answer: 8,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "9",
        correct_answer: 9,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "10",
        correct_answer: 10,
        math_opration: 1
      }
    ]
  },
  4: {
    value: 4,
    label: "Level D",
    sort: "D",
    isAvailable: true,
    descriptors: "(Doubles)",
    sortDescriptor: "(Dbls)",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "3",
        second_factor: "3",
        correct_answer: 6,
        math_opration: 1
      },
      {
        first_factor: "4",
        second_factor: "4",
        correct_answer: 8,
        math_opration: 1
      },
      {
        first_factor: "5",
        second_factor: "5",
        correct_answer: 10,
        math_opration: 1
      },
      {
        first_factor: "6",
        second_factor: "6",
        correct_answer: 12,
        math_opration: 1
      },
      {
        first_factor: "7",
        second_factor: "7",
        correct_answer: 14,
        math_opration: 1
      },
      {
        first_factor: "8",
        second_factor: "8",
        correct_answer: 16,
        math_opration: 1
      },
      {
        first_factor: "9",
        second_factor: "9",
        correct_answer: 18,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "10",
        correct_answer: 20,
        math_opration: 1
      }
    ]
  },
  5: {
    value: 5,
    label: "Level E",
    sort: "E",
    isAvailable: true,
    descriptors: "(+3 or +4)",
    sortDescriptor: "",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "3",
        second_factor: "5",
        correct_answer: 8,
        math_opration: 1
      },
      {
        first_factor: "3",
        second_factor: "6",
        correct_answer: 9,
        math_opration: 1
      },
      {
        first_factor: "3",
        second_factor: "7",
        correct_answer: 10,
        math_opration: 1
      },
      {
        first_factor: "4",
        second_factor: "6",
        correct_answer: 10,
        math_opration: 1
      }
    ]
  },
  6: {
    value: 6,
    label: "Level F",
    sort: "F",
    isAvailable: true,
    descriptors: "(+10)",
    sortDescriptor: "",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "10",
        second_factor: "3",
        correct_answer: 13,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "4",
        correct_answer: 14,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "5",
        correct_answer: 15,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "6",
        correct_answer: 16,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "7",
        correct_answer: 17,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "8",
        correct_answer: 18,
        math_opration: 1
      },
      {
        first_factor: "10",
        second_factor: "9",
        correct_answer: 19,
        math_opration: 1
      }
    ]
  },
  7: {
    value: 7,
    label: "Level G",
    sort: "G",
    isAvailable: true,
    descriptors: "(Near doubles)",
    sortDescriptor: "(Nr Dbls)",
    color: "red",
    stage: "basic",

    studentProgressPopupQnsList: [
      {
        first_factor: "3",
        second_factor: "4",
        correct_answer: 7,
        math_opration: 1
      },
      {
        first_factor: "4",
        second_factor: "5",
        correct_answer: 9,
        math_opration: 1
      },
      {
        first_factor: "5",
        second_factor: "6",
        correct_answer: 11,
        math_opration: 1
      },
      {
        first_factor: "6",
        second_factor: "7",
        correct_answer: 13,
        math_opration: 1
      },
      {
        first_factor: "7",
        second_factor: "8",
        correct_answer: 15,
        math_opration: 1
      },
      {
        first_factor: "8",
        second_factor: "9",
        correct_answer: 17,
        math_opration: 1
      }
    ]
  },
  8: {
    value: 8,
    label: "Level H",
    sort: "H",
    isAvailable: true,
    descriptors: "(+9)",
    sortDescriptor: "",
    color: "red",
    stage: "basic",

    studentProgressPopupQnsList: [
      {
        first_factor: "9",
        second_factor: "3",
        correct_answer: 12,
        math_opration: 1
      },
      {
        first_factor: "9",
        second_factor: "4",
        correct_answer: 13,
        math_opration: 1
      },
      {
        first_factor: "9",
        second_factor: "5",
        correct_answer: 14,
        math_opration: 1
      },
      {
        first_factor: "9",
        second_factor: "6",
        correct_answer: 15,
        math_opration: 1
      },
      {
        first_factor: "9",
        second_factor: "7",
        correct_answer: 16,
        math_opration: 1
      }
    ]
  },
  9: {
    value: 9,
    label: "Level J",
    sort: "J",
    isAvailable: true,
    descriptors: "(+8)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "8",
        second_factor: "3",
        correct_answer: 11,
        math_opration: 1
      },
      {
        first_factor: "8",
        second_factor: "4",
        correct_answer: 12,
        math_opration: 1
      },
      {
        first_factor: "8",
        second_factor: "5",
        correct_answer: 13,
        math_opration: 1
      },
      {
        first_factor: "8",
        second_factor: "6",
        correct_answer: 14,
        math_opration: 1
      }
    ]
  },
  10: {
    value: 10,
    label: "Level K",
    sort: "K",
    isAvailable: true,
    descriptors: "(+7)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "7",
        second_factor: "4",
        correct_answer: 11,
        math_opration: 1
      },
      {
        first_factor: "7",
        second_factor: "5",
        correct_answer: 12,
        math_opration: 1
      }
    ]
  },
  11: {
    value: 11,
    label: "Level L",
    sort: "L",
    isAvailable: true,
    color: "red",
    descriptors: "(+11 to 20)",
    stage: "advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "18",
        second_factor: "6",
        correct_answer: 24,
        math_opration: 1
      },
      {
        first_factor: "17",
        second_factor: "5",
        correct_answer: 22,
        math_opration: 2
      },
      {
        first_factor: "14",
        second_factor: "9",
        correct_answer: 23,
        math_opration: 1
      },
      {
        first_factor: "15",
        second_factor: "2",
        correct_answer: 13,
        math_opration: 2
      },
      {
        first_factor: "19",
        second_factor: "13",
        correct_answer: 6,
        math_opration: 2
      },
      {
        first_factor: "24",
        second_factor: "18",
        correct_answer: 6,
        math_opration: 2
      }
    ]
  },
  12: {
    value: 12,
    label: "Level M",
    sort: "M",
    isAvailable: true,
    stage: "advanced",
    color: "red",
    descriptors: "(+21 to 90)",
    studentProgressPopupQnsList: [
      {
        first_factor: "7",
        second_factor: "67",
        correct_answer: 74,
        math_opration: 1
      },
      {
        first_factor: "57",
        second_factor: "4",
        correct_answer: 61,
        math_opration: 1
      },
      {
        first_factor: "5",
        second_factor: "88",
        correct_answer: 93,
        math_opration: 1
      },
      {
        first_factor: "47",
        second_factor: "8",
        correct_answer: 39,
        math_opration: 2
      },
      {
        first_factor: "91",
        second_factor: "3",
        correct_answer: 88,
        math_opration: 2
      },
      {
        first_factor: "34",
        second_factor: "6",
        correct_answer: 28,
        math_opration: 2
      },
      {
        first_factor: "53",
        second_factor: "48",
        correct_answer: 5,
        math_opration: 2
      },
      {
        first_factor: "95",
        second_factor: "87",
        correct_answer: 8,
        math_opration: 2
      }
    ]
  },
  13: {
    value: 13,
    label: "Level N",
    sort: "N",
    isAvailable: true,
    stage: "super-advanced",
    color: "red",
    descriptors: "(☐☐ + ☐0 < 100)",
    studentProgressPopupQnsList: [
      {
        first_factor: "47",
        second_factor: "50",
        correct_answer: 97,
        math_opration: 1
      },
      {
        first_factor: "23",
        second_factor: "30",
        correct_answer: 53,
        math_opration: 1
      },
      {
        first_factor: "17",
        second_factor: "80",
        correct_answer: 97,
        math_opration: 1
      },
      {
        first_factor: "76",
        second_factor: "40",
        correct_answer: 36,
        math_opration: 2
      },
      {
        first_factor: "58",
        second_factor: "30",
        correct_answer: 28,
        math_opration: 2
      },
      {
        first_factor: "92",
        second_factor: "50",
        correct_answer: 42,
        math_opration: 2
      }
    ]
  },
  14: {
    value: 14,
    label: "Level O",
    sort: "O",
    isAvailable: true,
    stage: "super-advanced",
    color: "red",
    descriptors: "(☐☐ + ☐☐ < 100)",
    studentProgressPopupQnsList: [
      {
        first_factor: "47",
        second_factor: "54",
        correct_answer: 101,
        math_opration: 1
      },
      {
        first_factor: "39",
        second_factor: "23",
        correct_answer: 62,
        math_opration: 1
      },
      {
        first_factor: "17",
        second_factor: "85",
        correct_answer: 102,
        math_opration: 1
      },
      {
        first_factor: "76",
        second_factor: "47",
        correct_answer: 29,
        math_opration: 2
      },
      {
        first_factor: "58",
        second_factor: "32",
        correct_answer: 26,
        math_opration: 2
      },
      {
        first_factor: "92",
        second_factor: "54",
        correct_answer: 38,
        math_opration: 2
      }
    ]
  },
  15: {
    value: 15,
    label: "Level P",
    sort: "P",
    isAvailable: true,
    stage: "super-advanced",
    color: "red",
    descriptors: "(☐☐ + ☐9 < 100)",
    studentProgressPopupQnsList: [
      {
        first_factor: "47",
        second_factor: "59",
        correct_answer: 106,
        math_opration: 1
      },
      {
        first_factor: "39",
        second_factor: "29",
        correct_answer: 68,
        math_opration: 1
      },
      {
        first_factor: "17",
        second_factor: "89",
        correct_answer: 106,
        math_opration: 1
      },
      {
        first_factor: "76",
        second_factor: "49",
        correct_answer: 27,
        math_opration: 2
      },
      {
        first_factor: "58",
        second_factor: "39",
        correct_answer: 19,
        math_opration: 2
      },
      {
        first_factor: "92",
        second_factor: "59",
        correct_answer: 33,
        math_opration: 2
      }
    ]
  },
  16: {
    value: 16,
    label: "Level Q",
    sort: "Q",
    isAvailable: true,
    stage: "super-advanced",
    color: "red",
    descriptors: "(☐☐ + ☐0 > 100)",
    studentProgressPopupQnsList: [
      {
        first_factor: "87",
        second_factor: "50",
        correct_answer: 137,
        math_opration: 1
      },
      {
        first_factor: "64",
        second_factor: "90",
        correct_answer: 154,
        math_opration: 1
      },
      {
        first_factor: "77",
        second_factor: "60",
        correct_answer: 137,
        math_opration: 1
      },
      {
        first_factor: "146",
        second_factor: "80",
        correct_answer: 66,
        math_opration: 2
      },
      {
        first_factor: "124",
        second_factor: "40",
        correct_answer: 84,
        math_opration: 2
      },
      {
        first_factor: "178",
        second_factor: "90",
        correct_answer: 88,
        math_opration: 2
      }
    ]
  },
  17: {
    value: 17,
    label: "Level R",
    sort: "R",
    isAvailable: true,
    stage: "super-advanced",
    color: "red",
    descriptors: "(☐☐ + ☐☐ > 100)",
    studentProgressPopupQnsList: [
      {
        first_factor: "87",
        second_factor: "58",
        correct_answer: 145,
        math_opration: 1
      },
      {
        first_factor: "33",
        second_factor: "79",
        correct_answer: 112,
        math_opration: 1
      },
      {
        first_factor: "96",
        second_factor: "85",
        correct_answer: 181,
        math_opration: 1
      },
      {
        first_factor: "176",
        second_factor: "87",
        correct_answer: 89,
        math_opration: 2
      },
      {
        first_factor: "124",
        second_factor: "39",
        correct_answer: 85,
        math_opration: 2
      },
      {
        first_factor: "154",
        second_factor: "68",
        correct_answer: 86,
        math_opration: 2
      }
    ]
  },
  // 13: {
  //   value: 13,
  //   label: "Graduate",
  //   sort: "GR",
  //   isAvailable: false,
  //   color: "red",
  //   descriptors: "",
  //   studentProgressPopupQnsList: [],
  // },
  26: {
    value: 26,
    label: "Graduate",
    sort: "GR",
    isAvailable: true,
    color: "red",
    descriptors: "",
    stage: "graduate",
    studentProgressPopupQnsList: [
      {
        first_factor: "87",
        second_factor: "58",
        correct_answer: 145,
        math_opration: 1
      },
      {
        first_factor: "33",
        second_factor: "79",
        correct_answer: 112,
        math_opration: 1
      },
      {
        first_factor: "96",
        second_factor: "85",
        correct_answer: 181,
        math_opration: 1
      },
      {
        first_factor: "176",
        second_factor: "87",
        correct_answer: 89,
        math_opration: 2
      },
      {
        first_factor: "124",
        second_factor: "39",
        correct_answer: 85,
        math_opration: 2
      },
      {
        first_factor: "154",
        second_factor: "68",
        correct_answer: 86,
        math_opration: 2
      },
      {
        first_factor: "176",
        second_factor: "87",
        correct_answer: 89,
        math_opration: 2
      }
    ]
  }
};

export const mulSubLevelList = {
  0: {
    value: 0,
    label: "Warm Up",
    sort: "-",
    isAvailable: false,
    descriptors: "",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "2",
        second_factor: "2",
        correct_answer: 2,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "2",
        correct_answer: 4,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "3",
        correct_answer: 6,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "4",
        correct_answer: 8,
        math_opration: 3
      },

      {
        first_factor: "2",
        second_factor: "5",
        correct_answer: 10,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "6",
        correct_answer: 12,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "7",
        correct_answer: 14,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "8",
        correct_answer: 16,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "9",
        correct_answer: 18,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "25",
        correct_answer: 20,
        math_opration: 3
      }
    ]
  },
  1: {
    value: 1,
    label: "Level A",
    sort: "A",
    isAvailable: true,
    descriptors: "(x2)",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "2",
        second_factor: "1",
        correct_answer: 2,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "2",
        correct_answer: 4,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "3",
        correct_answer: 6,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "4",
        correct_answer: 8,
        math_opration: 3
      },

      {
        first_factor: "2",
        second_factor: "5",
        correct_answer: 10,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "6",
        correct_answer: 12,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "7",
        correct_answer: 14,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "8",
        correct_answer: 16,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "9",
        correct_answer: 18,
        math_opration: 3
      },
      {
        first_factor: "2",
        second_factor: "10",
        correct_answer: 20,
        math_opration: 3
      }
    ]
  },
  2: {
    value: 2,
    label: "Level B",
    sort: "B",
    isAvailable: true,
    descriptors: "(x10)",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "10",
        second_factor: "1",
        correct_answer: 10,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "2",
        correct_answer: 20,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "3",
        correct_answer: 30,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "4",
        correct_answer: 40,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "5",
        correct_answer: 50,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "6",
        correct_answer: 60,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "7",
        correct_answer: 70,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "8",
        correct_answer: 80,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "9",
        correct_answer: 90,
        math_opration: 3
      },
      {
        first_factor: "10",
        second_factor: "10",
        correct_answer: 100,
        math_opration: 3
      }
    ]
  },
  3: {
    value: 3,
    label: "Level C",
    sort: "C",
    isAvailable: true,
    descriptors: "(x5)",
    color: "red",

    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "5",
        second_factor: "1",
        correct_answer: 5,
        math_opration: 3
      },
      {
        first_factor: "5",
        second_factor: "3",
        correct_answer: 15,
        math_opration: 3
      },
      {
        first_factor: "5",
        second_factor: "4",
        correct_answer: 20,
        math_opration: 3
      },
      {
        first_factor: "5",
        second_factor: "5",
        correct_answer: 25,
        math_opration: 3
      },
      {
        first_factor: "5",
        second_factor: "6",
        correct_answer: 30,
        math_opration: 3
      },
      {
        first_factor: "5",
        second_factor: "7",
        correct_answer: 35,
        math_opration: 3
      },
      {
        first_factor: "5",
        second_factor: "8",
        correct_answer: 40,
        math_opration: 3
      }
    ]
  },
  4: {
    value: 4,
    label: "Level D",
    sort: "D",
    isAvailable: true,
    descriptors: "(x1)",
    color: "red",

    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "1",
        second_factor: "1",
        correct_answer: 1,
        math_opration: 3
      },
      {
        first_factor: "1",
        second_factor: "3",
        correct_answer: 3,
        math_opration: 3
      },
      {
        first_factor: "1",
        second_factor: "4",
        correct_answer: 4,
        math_opration: 3
      },
      {
        first_factor: "1",
        second_factor: "6",
        correct_answer: 6,
        math_opration: 3
      },
      {
        first_factor: "1",
        second_factor: "7",
        correct_answer: 7,
        math_opration: 3
      },
      {
        first_factor: "1",
        second_factor: "8",
        correct_answer: 8,
        math_opration: 3
      },
      {
        first_factor: "1",
        second_factor: "9",
        correct_answer: 9,
        math_opration: 3
      }
    ]
  },
  5: {
    value: 5,
    label: "Level E",
    sort: "E",
    isAvailable: true,
    descriptors: "(x0)",
    color: "red",
    stage: "lower-basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "0",
        second_factor: "0",
        correct_answer: 0,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "1",
        correct_answer: 0,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "2",
        correct_answer: 0,
        math_opration: 3
      },
      {
        first_factor: "0",
        second_factor: "3",
        correct_answer: 0,
        math_opration: 3
      },
      {
        first_factor: "0",
        second_factor: "4",
        correct_answer: 0,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "5",
        correct_answer: 0,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "6",
        correct_answer: 0,
        math_opration: 3
      },
      {
        first_factor: "0",
        second_factor: "7",
        correct_answer: 0,
        math_opration: 3
      },
      {
        first_factor: "0",
        second_factor: "8",
        correct_answer: 0,
        math_opration: 1
      },
      {
        first_factor: "0",
        second_factor: "9",
        correct_answer: 0,
        math_opration: 3
      },
      {
        first_factor: "0",
        second_factor: "10",
        correct_answer: 0,
        math_opration: 3
      }
    ]
  },
  6: {
    value: 6,
    label: "Level F",
    sort: "F",
    isAvailable: true,
    descriptors: "(x4)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "4",
        second_factor: "3",
        correct_answer: 12,
        math_opration: 3
      },
      {
        first_factor: "4",
        second_factor: "4",
        correct_answer: 16,
        math_opration: 3
      },
      {
        first_factor: "4",
        second_factor: "6",
        correct_answer: 24,
        math_opration: 1
      },
      {
        first_factor: "4",
        second_factor: "7",
        correct_answer: 28,
        math_opration: 1
      },
      {
        first_factor: "4",
        second_factor: "8",
        correct_answer: 32,
        math_opration: 1
      }
    ]
  },
  7: {
    value: 7,
    label: "Level G",
    sort: "G",
    isAvailable: true,
    descriptors: "(x3)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "3",
        second_factor: "3",
        correct_answer: 9,
        math_opration: 3
      },
      {
        first_factor: "3",
        second_factor: "6",
        correct_answer: 18,
        math_opration: 3
      },
      {
        first_factor: "3",
        second_factor: "7",
        correct_answer: 21,
        math_opration: 3
      },
      {
        first_factor: "3",
        second_factor: "8",
        correct_answer: 24,
        math_opration: 1
      }
    ]
  },
  8: {
    value: 8,
    label: "Level H",
    sort: "H",
    isAvailable: true,
    descriptors: "(x6)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "6",
        second_factor: "6",
        correct_answer: 36,
        math_opration: 1
      },
      {
        first_factor: "6",
        second_factor: "7",
        correct_answer: 42,
        math_opration: 1
      }
    ]
  },
  9: {
    value: 9,
    label: "Level J",
    sort: "J",
    isAvailable: true,
    descriptors: "(x9)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "9",
        second_factor: "3",
        correct_answer: 27,
        math_opration: 3
      },
      {
        first_factor: "9",
        second_factor: "4",
        correct_answer: 36,
        math_opration: 3
      },
      {
        first_factor: "9",
        second_factor: "5",
        correct_answer: 45,
        math_opration: 3
      },
      {
        first_factor: "9",
        second_factor: "6",
        correct_answer: 54,
        math_opration: 1
      },
      {
        first_factor: "9",
        second_factor: "7",
        correct_answer: 63,
        math_opration: 3
      },
      {
        first_factor: "9",
        second_factor: "8",
        correct_answer: 72,
        math_opration: 3
      },
      {
        first_factor: "9",
        second_factor: "9",
        correct_answer: 81,
        math_opration: 1
      }
    ]
  },
  10: {
    value: 10,
    label: "Level K",
    sort: "K",
    isAvailable: true,
    descriptors: "(x8)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "8",
        second_factor: "6",
        correct_answer: 48,
        math_opration: 1
      },
      {
        first_factor: "8",
        second_factor: "8",
        correct_answer: 64,
        math_opration: 1
      }
    ]
  },
  11: {
    value: 11,
    label: "Level L",
    sort: "L",
    isAvailable: true,
    descriptors: "(x7)",
    color: "red",
    stage: "basic",
    studentProgressPopupQnsList: [
      {
        first_factor: "7",
        second_factor: "7",
        correct_answer: 49,
        math_opration: 1
      },
      {
        first_factor: "7",
        second_factor: "8",
        correct_answer: 56,
        math_opration: 1
      }
    ]
  },
  12: {
    value: 12,
    label: "Level M",
    sort: "M",
    isAvailable: true,
    color: "red",
    stage: "advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "11",
        second_factor: "1",
        correct_answer: 11,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "2",
        correct_answer: 22,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "3",
        correct_answer: 33,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "4",
        correct_answer: 44,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "5",
        correct_answer: 55,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "6",
        correct_answer: 66,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "7",
        correct_answer: 77,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "8",
        correct_answer: 88,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "9",
        correct_answer: 99,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "10",
        correct_answer: 110,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "11",
        correct_answer: 121,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "12",
        correct_answer: 132,
        math_opration: 3
      }
    ],
    descriptors: "(x11)"
  },
  13: {
    value: 13,
    label: "Level N",
    sort: "N",
    isAvailable: true,
    color: "red",
    stage: "advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "12",
        second_factor: "1",
        correct_answer: 12,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "2",
        correct_answer: 24,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "3",
        correct_answer: 36,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "4",
        correct_answer: 48,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "5",
        correct_answer: 60,
        math_opration: 1
      },

      {
        first_factor: "12",
        second_factor: "6",
        correct_answer: 72,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "7",
        correct_answer: 84,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "8",
        correct_answer: 96,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "9",
        correct_answer: 108,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "10",
        correct_answer: 120,
        math_opration: 1
      },
      {
        first_factor: "12",
        second_factor: "12",
        correct_answer: 144,
        math_opration: 1
      }
    ],
    descriptors: "(x12)"
  },
  14: {
    value: 14,
    label: "Level O",
    sort: "O",
    isAvailable: true,
    color: "red",
    stage: "super-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "11",
        second_factor: "13",
        correct_answer: 143,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "14",
        correct_answer: 154,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "15",
        correct_answer: 165,
        math_opration: 3
      },

      {
        first_factor: "11",
        second_factor: "16",
        correct_answer: 176,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "17",
        correct_answer: 187,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "18",
        correct_answer: 198,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "19",
        correct_answer: 209,
        math_opration: 3
      },
      {
        first_factor: "11",
        second_factor: "20",
        correct_answer: 220,
        math_opration: 3
      }
    ],
    descriptors: "(x11)"
  },
  15: {
    value: 15,
    label: "Level P",
    sort: "P",
    isAvailable: true,
    color: "red",
    stage: "super-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "12",
        second_factor: "13",
        correct_answer: 156,
        math_opration: 3
      },
      {
        first_factor: "12",
        second_factor: "14",
        correct_answer: 168,
        math_opration: 3
      },
      {
        first_factor: "12",
        second_factor: "15",
        correct_answer: 180,
        math_opration: 3
      },

      {
        first_factor: "12",
        second_factor: "16",
        correct_answer: 192,
        math_opration: 3
      },
      {
        first_factor: "12",
        second_factor: "17",
        correct_answer: 204,
        math_opration: 3
      },
      {
        first_factor: "12",
        second_factor: "18",
        correct_answer: 216,
        math_opration: 3
      },
      {
        first_factor: "12",
        second_factor: "19",
        correct_answer: 228,
        math_opration: 3
      },
      {
        first_factor: "12",
        second_factor: "20",
        correct_answer: 240,
        math_opration: 3
      }
    ],
    descriptors: "(x12)"
  },
  16: {
    value: 16,
    label: "Level Q",
    sort: "Q",
    isAvailable: true,
    color: "red",
    stage: "super-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "50",
        second_factor: "1",
        correct_answer: 50,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "2",
        correct_answer: 100,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "3",
        correct_answer: 150,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "4",
        correct_answer: 200,
        math_opration: 3
      },

      {
        first_factor: "50",
        second_factor: "5",
        correct_answer: 250,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "6",
        correct_answer: 300,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "7",
        correct_answer: 350,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "8",
        correct_answer: 400,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "9",
        correct_answer: 450,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "10",
        correct_answer: 500,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "11",
        correct_answer: 550,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "12",
        correct_answer: 600,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "13",
        correct_answer: 650,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "14",
        correct_answer: 700,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "15",
        correct_answer: 750,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "16",
        correct_answer: 800,
        math_opration: 3
      },

      {
        first_factor: "50",
        second_factor: "17",
        correct_answer: 850,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "18",
        correct_answer: 900,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "19",
        correct_answer: 950,
        math_opration: 3
      },
      {
        first_factor: "50",
        second_factor: "20",
        correct_answer: 1000,
        math_opration: 3
      }
    ],
    descriptors: "(x50)"
  },
  17: {
    value: 17,
    label: "Level R",
    sort: "R",
    isAvailable: true,
    color: "red",
    stage: "super-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "15",
        second_factor: "1",
        correct_answer: 15,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "2",
        correct_answer: 30,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "4",
        correct_answer: 60,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "5",
        correct_answer: 75,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "6",
        correct_answer: 90,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "7",
        correct_answer: 105,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "8",
        correct_answer: 120,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "10",
        correct_answer: 150,
        math_opration: 3
      },

      {
        first_factor: "15",
        second_factor: "9",
        correct_answer: 135,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "10",
        correct_answer: 150,
        math_opration: 3
      },

      {
        first_factor: "15",
        second_factor: "13",
        correct_answer: 195,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "14",
        correct_answer: 210,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "15",
        correct_answer: 225,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "16",
        correct_answer: 240,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "17",
        correct_answer: 255,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "18",
        correct_answer: 270,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "19",
        correct_answer: 285,
        math_opration: 3
      },
      {
        first_factor: "15",
        second_factor: "20",
        correct_answer: 300,
        math_opration: 3
      }
    ],
    descriptors: "(x15)"
  },
  18: {
    value: 18,
    label: "Level S",
    sort: "S",
    isAvailable: true,
    color: "red",
    stage: "super-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "25",
        second_factor: "1",
        correct_answer: 25,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "2",
        correct_answer: 50,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "3",
        correct_answer: 75,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "4",
        correct_answer: 100,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "5",
        correct_answer: 125,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "6",
        correct_answer: 150,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "7",
        correct_answer: 175,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "8",
        correct_answer: 200,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "9",
        correct_answer: 225,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "10",
        correct_answer: 250,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "11",
        correct_answer: 275,
        math_opration: 3
      },

      {
        first_factor: "25",
        second_factor: "12",
        correct_answer: 300,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "13",
        correct_answer: 325,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "14",
        correct_answer: 350,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "15",
        correct_answer: 375,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "16",
        correct_answer: 400,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "17",
        correct_answer: 425,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "18",
        correct_answer: 450,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "19",
        correct_answer: 475,
        math_opration: 3
      },
      {
        first_factor: "25",
        second_factor: "20",
        correct_answer: 500,
        math_opration: 3
      }
    ],
    descriptors: "(x25)"
  },
  19: {
    value: 19,
    label: "Level T",
    sort: "T",
    isAvailable: true,
    color: "red",
    stage: "super-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "20",
        second_factor: "1",
        correct_answer: 20,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "2",
        correct_answer: 40,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "3",
        correct_answer: 60,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "4",
        correct_answer: 80,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "5",
        correct_answer: 100,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "6",
        correct_answer: 120,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "7",
        correct_answer: 140,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "8",
        correct_answer: 160,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "9",
        correct_answer: 180,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "10",
        correct_answer: 200,
        math_opration: 3
      },

      {
        first_factor: "20",
        second_factor: "13",
        correct_answer: 260,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "14",
        correct_answer: 280,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "15",
        correct_answer: 300,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "16",
        correct_answer: 320,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "17",
        correct_answer: 340,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "18",
        correct_answer: 360,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "19",
        correct_answer: 380,
        math_opration: 3
      },
      {
        first_factor: "20",
        second_factor: "20",
        correct_answer: 400,
        math_opration: 3
      }
    ],
    descriptors: "(x20)"
  },
  20: {
    value: 20,
    label: "Level U",
    sort: "U",
    isAvailable: true,
    color: "red",
    stage: "super-duper-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "19",
        second_factor: "1",
        correct_answer: 19,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "2",
        correct_answer: 38,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "3",
        correct_answer: 57,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "4",
        correct_answer: 76,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "5",
        correct_answer: 95,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "6",
        correct_answer: 114,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "7",
        correct_answer: 133,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "8",
        correct_answer: 152,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "9",
        correct_answer: 171,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "10",
        correct_answer: 190,
        math_opration: 3
      },

      {
        first_factor: "19",
        second_factor: "13",
        correct_answer: 247,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "14",
        correct_answer: 266,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "16",
        correct_answer: 304,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "17",
        correct_answer: 323,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "18",
        correct_answer: 342,
        math_opration: 3
      },
      {
        first_factor: "19",
        second_factor: "19",
        correct_answer: 361,
        math_opration: 3
      }
    ],
    descriptors: "(x19)"
  },
  21: {
    value: 21,
    label: "Level V",
    sort: "V",
    isAvailable: true,
    color: "red",
    stage: "super-duper-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "18",
        second_factor: "1",
        correct_answer: 18,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "2",
        correct_answer: 36,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "3",
        correct_answer: 54,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "4",
        correct_answer: 72,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "5",
        correct_answer: 90,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "6",
        correct_answer: 108,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "7",
        correct_answer: 126,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "8",
        correct_answer: 144,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "9",
        correct_answer: 162,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "10",
        correct_answer: 180,
        math_opration: 3
      },

      {
        first_factor: "18",
        second_factor: "13",
        correct_answer: 234,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "14",
        correct_answer: 252,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "16",
        correct_answer: 288,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "17",
        correct_answer: 306,
        math_opration: 3
      },
      {
        first_factor: "18",
        second_factor: "18",
        correct_answer: 324,
        math_opration: 3
      }
    ],
    descriptors: "(x18)"
  },
  22: {
    value: 22,
    label: "Level W",
    sort: "W",
    isAvailable: true,
    color: "red",
    stage: "super-duper-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "14",
        second_factor: "1",
        correct_answer: 14,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "2",
        correct_answer: 28,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "3",
        correct_answer: 42,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "4",
        correct_answer: 56,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "5",
        correct_answer: 70,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "6",
        correct_answer: 84,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "7",
        correct_answer: 98,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "8",
        correct_answer: 112,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "9",
        correct_answer: 126,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "10",
        correct_answer: 140,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "13",
        correct_answer: 182,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "14",
        correct_answer: 196,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "16",
        correct_answer: 224,
        math_opration: 3
      },
      {
        first_factor: "14",
        second_factor: "17",
        correct_answer: 238,
        math_opration: 3
      }
    ],
    descriptors: "(x14)"
  },
  23: {
    value: 23,
    label: "Level X",
    sort: "X",
    isAvailable: true,
    color: "red",
    stage: "super-duper-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "16",
        second_factor: "1",
        correct_answer: 16,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "2",
        correct_answer: 32,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "3",
        correct_answer: 48,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "4",
        correct_answer: 64,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "5",
        correct_answer: 80,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "6",
        correct_answer: 96,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "7",
        correct_answer: 112,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "8",
        correct_answer: 128,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "9",
        correct_answer: 144,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "10",
        correct_answer: 160,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "13",
        correct_answer: 208,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "16",
        correct_answer: 256,
        math_opration: 3
      },
      {
        first_factor: "16",
        second_factor: "17",
        correct_answer: 272,
        math_opration: 3
      }
    ],
    descriptors: "(x16)"
  },
  24: {
    value: 24,
    label: "Level Y",
    sort: "Y",
    isAvailable: true,
    color: "red",
    stage: "super-duper-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "13",
        second_factor: "1",
        correct_answer: 13,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "2",
        correct_answer: 26,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "3",
        correct_answer: 39,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "4",
        correct_answer: 52,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "5",
        correct_answer: 65,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "6",
        correct_answer: 78,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "7",
        correct_answer: 91,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "8",
        correct_answer: 104,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "9",
        correct_answer: 117,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "10",
        correct_answer: 130,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "13",
        correct_answer: 169,
        math_opration: 3
      },
      {
        first_factor: "13",
        second_factor: "17",
        correct_answer: 221,
        math_opration: 3
      }
    ],
    descriptors: "(x13)"
  },
  25: {
    value: 25,
    label: "Level Z",
    sort: "Z",
    isAvailable: true,
    color: "red",
    stage: "super-duper-advanced",
    studentProgressPopupQnsList: [
      {
        first_factor: "17",
        second_factor: "1",
        correct_answer: 17,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "2",
        correct_answer: 34,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "3",
        correct_answer: 51,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "4",
        correct_answer: 68,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "5",
        correct_answer: 85,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "6",
        correct_answer: 102,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "7",
        correct_answer: 119,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "8",
        correct_answer: 136,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "9",
        correct_answer: 153,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "10",
        correct_answer: 170,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "17",
        correct_answer: 289,
        math_opration: 3
      }
    ],
    descriptors: "(x17)"
  },
  26: {
    value: 26,
    label: "Graduate",
    sort: "GR",
    isAvailable: true,
    color: "red",
    stage: "graduate",
    studentProgressPopupQnsList: [
      {
        first_factor: "17",
        second_factor: "1",
        correct_answer: 17,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "2",
        correct_answer: 34,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "3",
        correct_answer: 51,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "4",
        correct_answer: 68,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "5",
        correct_answer: 85,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "6",
        correct_answer: 102,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "7",
        correct_answer: 119,
        math_opration: 3
      },
      {
        first_factor: "17",
        second_factor: "8",
        correct_answer: 136,
        math_opration: 3
      }
    ],

    descriptors: ""
  }
};

export const levels = {
  0: "Warm Up",
  1: "Level A",
  2: "Level B",
  3: "Level C",
  4: "Level D",
  5: "Level E",
  6: "Level F",
  7: "Level G",
  8: "Level H",
  9: "Level J",
  10: "Level K",
  11: "Level L",
  12: "Level M",
  13: "Level N",
  14: "Level O",
  15: "Level P",
  16: "Level Q",
  17: "Level R",
  18: "Level S",
  19: "Level T",
  20: "Level U",
  21: "Level V",
  22: "Level W",
  23: "Level X",
  24: "Level Y",
  25: "Level Z",
  26: "Graduate"
};

export const studentPasswordList = [
  "add",
  "all",
  "apple",
  "bag",
  "ball",
  "barn",
  "bear",
  "bee",
  "bell",
  "best",
  "better",
  "bike",
  "bird",
  "blue",
  "boat",
  "book",
  "bow",
  "box",
  "brave",
  "bus",
  "camp",
  "cap",
  "car",
  "card",
  "care",
  "cart",
  "cat",
  "cats",
  "clap",
  "clay",
  "clean",
  "clock",
  "cloud",
  "code",
  "cone",
  "cook",
  "cool",
  "cork",
  "corn",
  "cute",
  "dance",
  "day",
  "days",
  "dog",
  "dogs",
  "drum",
  "drums",
  "duck",
  "ducks",
  "face",
  "fact",
  "farm",
  "farmer",
  "farms",
  "fast",
  "feet",
  "fish",
  "fix",
  "flash",
  "flip",
  "foot",
  "fox",
  "free",
  "frog",
  "frogs",
  "funny",
  "game",
  "games",
  "garden",
  "gate",
  "gates",
  "give",
  "glad",
  "glide",
  "goat",
  "goats",
  "gold",
  "good",
  "grand",
  "grape",
  "grapes",
  "grass",
  "great",
  "green",
  "grin",
  "hall",
  "hand",
  "hands",
  "hat",
  "hats",
  "head",
  "hen",
  "hero",
  "hill",
  "hills",
  "hop",
  "hope",
  "house",
  "inch",
  "joke",
  "jokes",
  "joy",
  "jump",
  "kid",
  "kids",
  "kind",
  "kite",
  "kites",
  "lake",
  "lakes",
  "land",
  "learn",
  "lime",
  "list",
  "luck",
  "lucky",
  "magnet",
  "many",
  "map",
  "maple",
  "maps",
  "math",
  "mile",
  "moon",
  "more",
  "morning",
  "music",
  "nest",
  "nice",
  "north",
  "oak",
  "page",
  "paper",
  "park",
  "parks",
  "pass",
  "pen",
  "penny",
  "pens",
  "pine",
  "pines",
  "plant",
  "play",
  "plum",
  "pond",
  "ponds",
  "pop",
  "print",
  "prize",
  "puppy",
  "rabbit",
  "race",
  "ranch",
  "red",
  "ride",
  "river",
  "robin",
  "room",
  "sand",
  "seed",
  "shape",
  "sheep",
  "shell",
  "shine",
  "ship",
  "shirt",
  "shoe",
  "silver",
  "sing",
  "skate",
  "sky",
  "sled",
  "smile",
  "snap",
  "snow",
  "soft",
  "song",
  "songs",
  "spin",
  "spot",
  "stamp",
  "start",
  "step",
  "stick",
  "straw",
  "strong",
  "sun",
  "sunny",
  "swim",
  "table",
  "tap",
  "team",
  "thank",
  "think",
  "tree",
  "trees",
  "try",
  "vote",
  "walk",
  "watch",
  "well",
  "west",
  "whale",
  "win",
  "wind",
  "wing",
  "wise",
  "wish",
  "wood",
  "yard",
  "yards",
  "year",
  "years",
  "zap",
  "zebra",
  "zip",
  "zoo"
];

export const userRole = {
  STUDENT: {
    role_id: 3,
    role_name: "student"
  },
  TEACHER: {
    role_id: 2,
    role_name: "teacher"
  },
  PARENT: {
    role_id: 4,
    role_name: "parent"
  },
  SCHOOL_ADMIN: {
    role_id: 5,
    role_name: "school_admin"
  }
};

export const addSubLevelFluencyRate = {
  // Level Index : Fluency Rate
  // WA level
  0: 1,
  // Level A
  1: 1,
  // Level B
  2: 1,
  // Level C
  3: 1,
  // Level D
  4: 1,
  // Level E
  5: 1,
  // Level F
  6: 1,
  // Level G
  7: 1,
  // Level H
  8: 1,
  // Level J
  9: 1,
  // Level K
  10: 1,
  // Level L
  11: 1,
  // Level M
  12: 1.5,
  // Level N
  13: 1.5,
  // Level O
  14: 2,
  // Level P
  15: 2,
  // Level Q
  16: 2,
  // Level R
  17: 2,
  // Graduate
  26: 2
};

export const mulDivLevelFluencyRate = {
  // Level Index : Fluency Rate
  // WA level
  0: 1,
  // Level A
  1: 1,
  // Level B
  2: 1,
  // Level C
  3: 1,
  // Level D
  4: 1,
  // Level E
  5: 1,
  // Level F
  6: 1,
  // Level G
  7: 1,
  // Level H
  8: 1,
  // Level J
  9: 1,
  // Level K
  10: 1,
  // Level L
  11: 1,
  // Level M
  12: 1,
  // Level N
  13: 1,
  // Level O
  14: 1.5,
  // Level P
  15: 1.5,
  // Level Q
  16: 1.5,
  // Level R
  17: 1.5,
  // Level S
  18: 1.5,
  // Level T
  19: 1.5,
  // Level U
  20: 2,
  // Level V
  21: 2,
  // Level W
  22: 2,
  // Level X
  23: 2,
  // Level Y
  24: 2,
  // Level Z
  25: 2,
  // Graduate
  26: 2
};
//For Hint Show Use following variable
//  No hint : 0
//   One Hint : 1
//   Two Hint : 2
export const strategyDetailBySlug = {
  // here right and wrong answer time is in milliseconds
  DOUBLES_WITH_DICE: {
    slug: "dice-2=1+1", // dice-2=1+1
    enums: "DOUBLES_WITH_DICE",
    isShowHint: 1,
    desc: "2 groups = 1 group + 1 group",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_GROUPS_OF_ONE: {
    slug: "dice-groups-of-one",
    enums: "DICE_GROUPS_OF_ONE",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  "2_FIVES_IS_TEN_WITH_DICE": {
    slug: "dice-2-fives-10",
    enums: "2_FIVES_IS_TEN_WITH_DICE",
    isShowHint: 1,
    desc: "2 fives = ten",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_FOUR_GROUP: {
    slug: "dice-4=2+2",
    enums: "DICE_FOUR_GROUP",
    isShowHint: 1,
    desc: "4 groups = 2 groups + 2 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_THREE_GROUP: {
    slug: "dice-3=2+1",
    enums: "DICE_THREE_GROUP",
    isShowHint: 1,
    desc: "3 groups = 2 groups + 1 group",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_SIX_GROUP: {
    slug: "dice-6=3+3",
    enums: "DICE_SIX_GROUP",
    isShowHint: 1,
    desc: "6 groups = 3 groups + 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_SEVEN_GROUP: {
    slug: "dice-7=6+1",
    enums: "DICE_SEVEN_GROUP",
    isShowHint: 1,
    desc: "7 groups = 6 groups + 1 group",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_ZERO_GROUPS: {
    slug: "dice-zero-groups",
    enums: "DICE_ZERO_GROUPS",
    isShowHint: 0,
    desc: "No",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_GROUPS_OF_ZERO: {
    slug: "dice-groups-of-zero",
    enums: "DICE_GROUPS_OF_ZERO",
    isShowHint: 0,
    desc: "A group of zeros = 0",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DOUBLE_FOURS_IS_EIGHT_WITH_DICE: {
    slug: "dice-8=4+4",
    enums: "DOUBLE_FOURS_IS_EIGHT_WITH_DICE",
    isShowHint: 1,
    desc: "8 groups = 4 groups + 4 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_FIVE_ONE: {
    slug: "dice-6=5+1",
    enums: "DICE_FIVE_ONE",
    isShowHint: 1,
    desc: "6 groups = 5 groups + 1 group",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_FIVE_TWO_GROUPS: {
    slug: "dice-7=5+2",
    enums: "DICE_FIVE_TWO_GROUPS",
    isShowHint: 1,
    desc: "7 groups = 5 groups + 2 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_FIVE_THREE_GROUPS: {
    slug: "dice-8=5+3",
    enums: "DICE_FIVE_THREE_GROUPS",
    isShowHint: 1,
    desc: "8 groups = 5 groups + 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_ONE_GROUP: {
    slug: "dice-one-groups",
    enums: "DICE_ONE_GROUP",
    isShowHint: 0,
    desc: "1 group of",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_MINUS_ONE_GROUP: {
    slug: "dice-9=10-1",
    enums: "DICE_TEN_MINUS_ONE_GROUP",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },

  TEN_FRAMES_DOUBLE_DICES: {
    slug: "ten-frames-2=1+1",
    enums: "TEN_FRAMES_DOUBLE_DICES",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TEN_FRAMES_X3: {
    slug: "ten-frames-3=2+1",
    enums: "TEN_FRAMES_X3",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TEN_FRAMES_X4: {
    slug: "ten-frames-4=2+2",
    enums: "TEN_FRAMES_X4",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  FILL_IN_THE_BLANKS: {
    slug: "fill-in-the-blanks",
    enums: "FILL_IN_THE_BLANKS",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  NUMBER_LINES: {
    slug: "number-lines",
    enums: "NUMBER_LINES",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: false,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TEN_ON_PLACE_VALUE_CHART: {
    slug: "tens-on-a-place-value-chart",
    enums: "TEN_ON_PLACE_VALUE_CHART",
    isShowHint: 1,
    desc: "To multiply by 10, shift up one place value.",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TEN_ON_PLACE_VALUE_CHART_NON_VISIBLE: {
    slug: "tens-on-a-place-value-chart-non-visible",
    enums: "TEN_ON_PLACE_VALUE_CHART_NON_VISIBLE",
    isShowHint: 1,
    desc: "To multiply by 10, shift up one place value.",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  BEADS_ADDITION: {
    slug: "beads-addition",
    enums: "BEADS_ADDITION",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  BEADS_SUBTRACTION: {
    slug: "beads-subtraction",
    enums: "BEADS_SUBTRACTION",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DOUBLE_BAR_DAIGRAMS: {
    slug: "double-bar-diagram",
    enums: "DOUBLE_BAR_DAIGRAMS",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  AREA_MODELS: {
    slug: "area-models",
    enums: "AREA_MODELS",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: false,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  OPEN_ARRAYS: {
    slug: "open-arrays",
    enums: "OPEN_ARRAYS",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: false,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TEN_FRAMES_ADDITION: {
    slug: "ten-frames-addition",
    enums: "TEN_FRAMES_ADDITION",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TEN_FRAMES_SUBTRACTION: {
    slug: "ten-frames-subtraction",
    enums: "TEN_FRAMES_SUBTRACTION",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  NINE_PATTERNS_STAGE_ONE: {
    slug: "nines-patterns-stage-1",
    enums: "NINE_PATTERNS_STAGE_ONE",
    isShowHint: 1,
    desc: "Notice the patterns.",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  NINE_PATTERNS_STAGE_TWO: {
    slug: "nines-patterns-stage-2",
    enums: "NINE_PATTERNS_STAGE_TWO",
    isShowHint: 1,
    desc: "For nines, the tens digit plus the ones digit equals 9!",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  NINE_PATTERNS_STAGE_THREE: {
    slug: "nines-patterns-stage-3",
    enums: "NINE_PATTERNS_STAGE_THREE",
    isShowHint: 1,
    desc: "For the 10s digit, subtract one from the first factor.",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  NINE_PATTERNS_STAGE_FOUR: {
    slug: "nines-patterns-stage-4",
    enums: "NINE_PATTERNS_STAGE_FOUR",
    isShowHint: 1,
    desc: "For nines, the tens digit plus the ones digit equals 9!",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  FIVE_IS_HALF_OF_TEN: {
    slug: "five-is-half-of-ten",
    enums: "FIVE_IS_HALF_OF_TEN",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  FINGERS_TRICK: {
    slug: "fingers-trick",
    enums: "FINGERS_TRICK",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  CLOCK_FACES: {
    slug: "clock-faces",
    enums: "CLOCK_FACES",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  MISSING_ADDEND: {
    slug: "missing-addend",
    enums: "MISSING_ADDEND",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  FIVE_IS_HALF_OF_TEN_WITH_BEADS: {
    slug: "five-is-half-of-ten-with-beads",
    enums: "FIVE_IS_HALF_OF_TEN_WITH_BEADS",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DIVISION_NUMBER_LINE: {
    slug: "division-number-line",
    enums: "DIVISION_NUMBER_LINE",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  //Level M & N

  DICE_TEN_PLUS_ONE_GROUP: {
    slug: "dice-11=10+1",
    enums: "DICE_TEN_PLUS_ONE_GROUP",
    isShowHint: 1,
    desc: "10 groups + 1 group = 11 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_TWO_GROUP: {
    slug: "dice-12=10+2",
    enums: "DICE_TEN_PLUS_TWO_GROUP",
    isShowHint: 1,
    desc: "10 groups + 2 groups = 12 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_SIX_PLUS_SIX: {
    slug: "dice-12=6+6",
    enums: "DICE_SIX_PLUS_SIX",
    isShowHint: 1,
    desc: "12 groups = 6 groups + 6 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  ELEVENS_PATTERNS: {
    slug: "eleven-patterns-stage-1",
    enums: "ELEVENS_PATTERNS",
    isShowHint: 1,
    desc: "Use the patterns above to help you.",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  ELEVENS_PATTERNS_STAGE_2: {
    slug: "eleven-patterns-stage-2",
    enums: "ELEVENS_PATTERNS_STAGE_2",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  GROUPS_OF_TWELVE: {
    slug: "group-of-12",
    enums: "GROUPS_OF_TWELVE",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  BAR_DIAGRAM_DIVISION: {
    slug: "division-bar-diagram",
    enums: "BAR_DIAGRAM_DIVISION",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 1000,
    wrongAnswerTime: 2000
  },
  FIND_DIFFERENCE: {
    slug: "find-difference",
    enums: "FIND_DIFFERENCE",
    isShowHint: 2,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  FIFTY_GROUPS_STAGE_1: {
    slug: "dice-50=5x10-stage-1",

    enums: "FIFTY_GROUPS_STAGE_1",
    isShowHint: 1,
    desc: "50 groups = 5 groups x 10",

    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  FIFTY_GROUPS_STAGE_2: {
    slug: "dice-50=5x10-stage-2",
    enums: "FIFTY_GROUPS_STAGE_2",
    isShowHint: 1,
    desc: "50 groups = 5 groups x 10",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE: {
    slug: "dice-15=10+5-stage-1",
    enums: "DICE_TEN_PLUS_FIVE_GROUP_STAGE_ONE",
    isShowHint: 0,
    desc: "15 groups = 10 groups + 5 groups",

    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_FIVE_GROUP_STAGE_TWO: {
    slug: "dice-15=10+5-stage-2",
    enums: "DICE_TEN_PLUS_FIVE_GROUP_STAGE_TWO",
    isShowHint: 0,
    desc: "15 groups = 10 groups + 5 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE: {
    slug: "quarters-4x25=100-stage-1",
    enums: "QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_ONE",
    isShowHint: 1,
    desc: "4 twenty-fives = 100",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_TWO: {
    slug: "quarters-4x25=100-stage-2",
    enums: "QUARTERS_FOR_MULTIPLY_TWENTY_FIVE_STATE_TWO",
    isShowHint: 1,
    desc: "4 twenty-fives = 100",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TWENTY_GROUPS: {
    slug: "twenty-groups",
    enums: "TWENTY_GROUPS",
    isShowHint: 1,
    desc: "20 groups = 2 groups x 10",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_GROUP_STAGE_ONE: {
    slug: "dice-20=10+10-stage-1",
    enums: "DICE_TWENTY_GROUP_STAGE_ONE",
    isShowHint: 1,
    desc: "20 groups = 10 groups + 10 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_GROUP_STAGE_TWO: {
    slug: "dice-20=10+10-stage-2",
    enums: "DICE_TWENTY_GROUP_STAGE_TWO",
    isShowHint: 1,
    desc: "20 groups = 10 groups + 10 groups",

    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_MINUS_ONE_GROUP_STAGE_ONE: {
    slug: "dice-19=20-1-stage-1",
    enums: "DICE_TWENTY_MINUS_ONE_GROUP_STAGE_ONE",
    isShowHint: 2,
    desc: "19 groups = 20 groups - 1 group",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_MINUS_ONE_GROUP_STAGE_TWO: {
    slug: "dice-19=20-1-stage-2",
    enums: "DICE_TWENTY_MINUS_ONE_GROUP_STAGE_TWO",
    isShowHint: 2,
    desc: "19 groups = 20 groups - 1 group",

    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_MINUS_TWO_GROUP_STAGE_ONE: {
    slug: "dice-18=20-2-stage-1",
    enums: "DICE_TWENTY_MINUS_TWO_GROUP_STAGE_ONE",
    isShowHint: 2,
    desc: "18 groups = 20 groups - 2 groups",

    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_MINUS_TWO_GROUP_STAGE_TWO: {
    slug: "dice-18=20-2-stage-2",
    enums: "DICE_TWENTY_MINUS_TWO_GROUP_STAGE_TWO",
    isShowHint: 2,
    desc: "18 groups = 20 groups - 2 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_MINUS_THREE_GROUP_STAGE_ONE: {
    slug: "dice-17=20-3-stage-1",
    enums: "DICE_TWENTY_MINUS_THREE_GROUP_STAGE_ONE",
    isShowHint: 2,

    desc: "17 groups = 20 groups - 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TWENTY_MINUS_THREE_GROUP_STAGE_TWO: {
    slug: "dice-17=20-3-stage-2",
    enums: "DICE_TWENTY_MINUS_THREE_GROUP_STAGE_TWO",
    isShowHint: 2,
    desc: "17 groups = 20 groups - 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_THREE_GROUP_STAGE_ONE: {
    slug: "dice-13=10+3-stage-1",
    enums: "DICE_TEN_PLUS_THREE_GROUP_STAGE_ONE",
    isShowHint: 0,
    desc: "13 groups = 10 groups + 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_THREE_GROUP_STAGE_TWO: {
    slug: "dice-13=10+3-stage-2",
    enums: "DICE_TEN_PLUS_THREE_GROUP_STAGE_TWO",
    isShowHint: 0,
    desc: "13 groups = 10 groups + 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_FOUR_GROUP_STAGE_ONE: {
    slug: "dice-14=10+4-stage-1",
    enums: "DICE_TEN_PLUS_FOUR_GROUP_STAGE_ONE",
    isShowHint: 0,
    desc: "14 groups = 10 groups + 4 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_TEN_PLUS_FOUR_GROUP_STAGE_TWO: {
    slug: "dice-14=10+4-stage-2",
    enums: "DICE_TEN_PLUS_FOUR_GROUP_STAGE_TWO",
    isShowHint: 0,
    desc: "14 groups = 10 groups + 4 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_SIXTEEN_GROUPS_STAGE_ONE: {
    slug: "dice-16=8+8-stage-1",
    enums: "DICE_SIXTEEN_GROUPS_STAGE_ONE",
    isShowHint: 1,
    desc: "16 groups = 8 groups + 8 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  DICE_SIXTEEN_GROUPS_STAGE_TWO: {
    slug: "dice-16=8+8-stage-2",
    enums: "DICE_SIXTEEN_GROUPS_STAGE_TWO",
    isShowHint: 0,
    desc: "13 groups = 10 groups + 3 groups",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  GROUPS_OF_SEVENTEEN: {
    slug: "group-of-17",
    enums: "GROUPS_OF_SEVENTEEN",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },

  // 28 - 29
  TWO_DIGITS_PLUS_MULTIPLE_OF_TEN: {
    slug: "2-digit-plus-multiple-of-10",
    enums: "TWO_DIGITS_PLUS_MULTIPLE_OF_TEN",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TWO_DIGITS_MINUS_MULTIPLE_OF_TEN: {
    slug: "2-digit-minus-multiple-of-10",
    enums: "TWO_DIGITS_MINUS_MULTIPLE_OF_TEN",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },

  // 30 - 31

  TWO_DIGITS_PLUS_TWO_DIGITS: {
    slug: "2-digit-plus-2-digit",
    enums: "TWO_DIGITS_PLUS_TWO_DIGITS",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TWO_DIGITS_MINUS_TWO_DIGITS: {
    slug: "2-digit-minus-2-digit",
    enums: "TWO_DIGITS_MINUS_TWO_DIGITS",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },

  //32-33

  TWO_DIGITS_PLUS_TWO_DIGITS_OF_NINE: {
    slug: "2-digit-plus-2-digit-ends-with-9",
    enums: "TWO_DIGITS_PLUS_TWO_DIGITS_OF_NINE",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TWO_DIGITS_MINUS_TWO_DIGITS_OF_NINE: {
    slug: "2-digit-minus-2-digit-ends-with-9",
    enums: "TWO_DIGITS_MINUS_TWO_DIGITS_OF_NINE",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },

  //34-35

  TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10: {
    slug: "2-digit-plus-2-digit-with-sums-greater-than-100-of-10",
    enums: "TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10: {
    slug: "2-digit-minus-2-digit-with-minuends-greater-than-100-of-10",
    enums: "TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100__OF_10",
    isShowHint: 0,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  //36-37

  TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100: {
    slug: "2-digit-plus-2-digit-with-sums-greater-than-100",
    enums: "TWO_DIGITS_PLUS_TWO_DIGITS_WITH_SUM_GT_100",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  },
  TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100: {
    slug: "2-digit-minus-2-digit-with-minuends-greater-than-100",
    enums: "TWO_DIGITS_MINUS_TWO_DIGITS_WITH_SUM_GT_100",
    isShowHint: 1,
    desc: "",
    isShowBottomSection: true,
    rightAnswerTime: 250,
    wrongAnswerTime: 500
  }
};

export const MATH_OPERATION = {
  ADDITION: 1,
  SUBTRACTION: 2,
  MULTIPLICATION: 3,
  DIVISION: 4
};

export const mathOperationList = {
  1: "+",
  2: "-",
  3: "x",
  4: "÷"
};

export const mathOperationTitleList = {
  1: "Addition",
  2: "Subtraction",
  3: "Multiplication",
  4: "Division"
};

export const mathOperationSymbol = {
  [MATH_OPERATION.ADDITION]: "+",
  [MATH_OPERATION.SUBTRACTION]: "-",
  [MATH_OPERATION.MULTIPLICATION]: "x",
  [MATH_OPERATION.DIVISION]: "÷"
};

export const checkedObjList = [
  "first_factor",
  "second_factor",
  "correct_answer",
  "correct_answer_first_factor",
  "correct_answer_second_factor"
];

export const googleLoginScope = [
  // "https://www.googleapis.com/auth/classroom.rosters.readonly",
  // "https://www.googleapis.com/auth/classroom.courses.readonly",
  "email",
  "profile"
];

export const googleScopeClassroom = [
  "https://www.googleapis.com/auth/classroom.rosters.readonly",
  "https://www.googleapis.com/auth/classroom.courses.readonly"
];

export const studentTableFilterColumnOptions = [
  {
    label: "Mode View",
    id: "mode_view",
    defaultChecked: true
  },
  // {
  //   label: "Last Name",
  //   id: "last_name",
  //   defaultChecked: true,
  // },
  {
    label: "Name",
    id: "name1",
    defaultChecked: true
  },
  {
    label: "Status",
    id: "status",
    defaultChecked: true
  },
  {
    label: "+/- Mode",
    id: "add_sub_level_id",
    defaultChecked: false
  },
  {
    label: "x/÷ Mode",
    id: "mul_div_level_id",
    defaultChecked: false
  },
  {
    label: "Fluency Rate",
    id: "max_timeout_correct_ans_secs",
    defaultChecked: false
  },
  {
    label: "Whoopsies",
    id: "allowed_level_lifter_whoopsies",
    defaultChecked: false
  },
  {
    label: "Edit",
    id: "edit",
    defaultChecked: true
  },
  {
    label: "Actions",
    id: "actions",
    defaultChecked: true
  },
  {
    label: "Usage Stats",
    id: "usage_stats",
    defaultChecked: false
  },
  {
    label: "Username",
    id: "user_name",
    defaultChecked: true,
    disabled: true
  },
  {
    label: "Password",
    id: "password",
    defaultChecked: true
  },

  {
    label: "Class name",
    id: "class_name",
    defaultChecked: false
  },
  {
    label: "Class code",
    id: "class_code",
    defaultChecked: true
  }
];

export const studentTableColumnOptions = {
  performance: [
    {
      label: "",
      id: "selection",
      defaultChecked: true
    },
    {
      label: "Mode View",
      id: "mode_view",
      defaultChecked: false
    },
    // {
    //   label: "Last Name",
    //   id: "last_name",
    //   defaultChecked: true,
    // },
    {
      label: "Name",
      id: "name1",
      defaultChecked: true
    },
    {
      label: "Status",
      id: "status",
      defaultChecked: process.env.REACT_APP_ENV === "development"
    },
    {
      label: "+/- Mode",
      id: "previous_add_sub_level_id",
      defaultChecked: true
    },
    {
      label: "x/÷ Mode",
      id: "previous_mul_div_level_id",
      defaultChecked: true
    },
    {
      label: "+/- Mode",
      id: "add_sub_level_id",
      defaultChecked: false
    },
    {
      label: "x/÷ Mode",
      id: "mul_div_level_id",
      defaultChecked: false
    },
    {
      label: "Assignment",
      id: "assignment",

      defaultChecked: true
    },
    {
      label: "Actions",
      id: "performance_actions",
      defaultChecked: true
    },
    {
      label: "Fluency Rate",
      id: "max_timeout_correct_ans_secs",
      defaultChecked: false
    },
    {
      label: "Usage Stats",
      id: "usage_stats",
      defaultChecked: true
    },
    {
      label: "Fluency Rate",
      id: "max_timeout_correct_ans_secs",
      defaultChecked: true
    },
    {
      label: "Whoopsies",
      id: "allowed_level_lifter_whoopsies",
      defaultChecked: true
    },
    {
      label: "Edit",
      id: "edit",
      defaultChecked: false
    },
    {
      label: "Updated at",
      id: "updated_at",
      defaultChecked: false
    },
    {
      label: "Actions",
      id: "actions",
      defaultChecked: false
    },

    {
      label: "Password",
      id: "password",
      defaultChecked: false
    },

    {
      label: "Class name",
      id: "class_name",
      defaultChecked: false
    },
    {
      label: "Class code",
      id: "class_code",
      defaultChecked: false
    },

    {
      label: "edit",
      id: "edit",
      defaultChecked: false
    },

    {
      label: "assigned fluency rate",
      id: "assigned_fluency_rate",
      defaultChecked: false
    }
  ],
  informative: [
    {
      label: "",
      id: "selection",
      defaultChecked: true
    },
    {
      label: "Mode View",
      id: "mode_view",
      defaultChecked: false
    },
    {
      label: "Name",
      id: "name1",
      defaultChecked: true
    },

    {
      label: "Status",
      id: "status",
      defaultChecked: false
    },
    {
      label: "+/- Mode",
      id: "previous_add_sub_level_id",
      defaultChecked: false
    },
    {
      label: "x/÷ Mode",
      id: "previous_mul_div_level_id",
      defaultChecked: false
    },

    {
      label: "+/- Mode",
      id: "add_sub_level_id",
      defaultChecked: false
    },
    {
      label: "x/÷ Mode",
      id: "mul_div_level_id",
      defaultChecked: false
    },
    {
      label: "Fluency Rate",
      id: "max_timeout_correct_ans_secs",
      defaultChecked: false
    },
    {
      label: "Whoopsies",
      id: "allowed_level_lifter_whoopsies",
      defaultChecked: false
    },

    {
      label: "Usage Stats",
      id: "usage_stats",
      defaultChecked: false
    },
    {
      label: "Username",
      id: "user_name",
      defaultChecked: true,
      disabled: true
    },
    {
      label: "Password",
      id: "password",
      defaultChecked: true
    },

    {
      label: "Class name",
      id: "class_name",
      defaultChecked: true
    },
    {
      label: "Class code",
      id: "class_code",
      defaultChecked: true
    },
    {
      label: "Updated at",
      id: "updated_at",
      defaultChecked: true
    },
    {
      label: "Actions",
      id: "actions",
      defaultChecked: false
    },
    {
      label: "Actions",
      id: "informative_actions",
      defaultChecked: true
    },

    {
      label: "Edit",
      id: "edit",
      defaultChecked: false
    }
  ]
};

export const superAddSubLevelStrategyName = {
  "XX + XX": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>+</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
      </div>
    </>
  ),
  "1XX - XX": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span style={{ marginRight: "6px" }} className="flex align-items-center justify-content-center">
          1
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>-</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
      </div>
    </>
  ),
  "XX + X0": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>+</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>0</span>
      </div>
    </>
  ),
  "XX - X0": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>-</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>0</span>
      </div>
    </>
  ),
  "XX - XX": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>-</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
      </div>
    </>
  ),
  "XX + X9": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>+</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>9</span>
      </div>
    </>
  ),
  "XX - X9": (
    // <>
    <div className="flex align-items-center justify-content-center">
      <span>
        <div className="box-strategy-icon"></div>
      </span>
      <span>
        <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
      </span>
      <span>
        <div className="box-strategy-icon"></div>
      </span>
      <span style={{ marginRight: "6px", marginLeft: "6px" }}>-</span>
      <span>
        <div className="box-strategy-icon"></div>
      </span>
      <span>
        <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
      </span>
      <span>9</span>
    </div>
    // </>
  ),
  "1XX - X0": (
    <>
      <div className="flex align-items-center justify-content-center">
        <span style={{ marginRight: "6px" }}>1</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span style={{ marginRight: "6px", marginLeft: "6px" }}>-</span>
        <span>
          <div className="box-strategy-icon"></div>
        </span>
        <span>
          <div style={{ border: "0px solid", height: "16px", width: "5px" }}></div>
        </span>
        <span>0</span>
      </div>
    </>
  )
};

// Math operation order list

export const mathOperationOrderList = {
  Addition: 1,
  Subtraction: 2,
  Multiplication: 3,
  Division: 4
};
