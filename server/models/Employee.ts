import mongoose, { Schema } from "mongoose"

export interface IEmployee_To {
  email: string
  password: string
  firstName: string
  lastName: string
  preferredName: string
  role: string
  roleId: string
}

const employeeSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  preferredName: { type: String, required: true },
  role: { type: String, required: true, default: "employee" },
  roleId: { type: String, required: true, default: process.env.ROLE_BASIC_ID }
})

const Employee = mongoose.model<IEmployee_To>("Employee", employeeSchema)

export default Employee
