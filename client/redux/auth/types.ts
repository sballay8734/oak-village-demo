export interface IEmployee_From {
  employeeName: string
  employeeId: string
  employeeClassroom: string
  // TODO: Remove role eventually
  role: string
}

export interface ILoginInfo {
  email: string
  password: string
}
export interface IRegisterInfo {
  email: string
  password: string
  confirmPassword: string
}
