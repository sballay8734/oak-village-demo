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
