/**
 * Authorization Roles
 */
// const authRoles = {
//   all: ["admin", "teacher", "student"],
//   admin: ["admin"],
//   teacher: ["teacher"],
//   parent: ["parent"],
//   school_admin: ["school_admin", "teacher"],
//   student: ["student"],
//   staff: ["admin", "staff"],
//   user: ["admin", "staff", "user"],

//   onlyGuest: [],
// };

// export default authRoles;
export const authRoles = {
  school_admin: "school_admin",
  teacher: "teacher",
  parent: "parent",
  student: "student"
};
