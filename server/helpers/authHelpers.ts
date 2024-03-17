// TODO: Refactor this. It's a bit confusing
export const fieldsAreNotValid = (
  classroom: string,
  areaInClassroom: string,
  taskNeeded: string
) =>
  // "if classroom.trim() is NOT truthy - meaning it is not empty
  // "" === falsy, "alskjdf" === truthy
  !classroom ||
  !areaInClassroom ||
  !taskNeeded ||
  !classroom.trim() ||
  !areaInClassroom.trim() ||
  !taskNeeded.trim()

// if passwords match
export const passwordsMatch = (password: string, confirmPassword: string) =>
  password === confirmPassword

export function roleIsValid(roleId: string, role: string) {
  const roleMap: { [key: string]: string } = {
    [process.env.ROLE_PAST_ID!]: "teacher",
    [process.env.ROLE_JOHN_ID!]: "maintenance",
    [process.env.ROLE_DAD_ID!]: "parent",
    [process.env.ROLE_KING_ID!]: "admin"
  }

  // console.log("ID SAYS:", roleMap[roleId], "ROLE SAYS:", role)
  return roleMap[roleId] === role
}
