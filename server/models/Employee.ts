import mongoose, { Schema } from "mongoose"

export interface IEmployee_To {
  email: string
  password: string
  firstName: string
  lastName: string
  preferredName: string
  role: string
  roleId: string
  // TODO: Classroom should be set by admin when employee is hired
  classroom:
    | "Infant 1"
    | "Infant 2"
    | "Toddler 1"
    | "Toddler 2"
    | "Toddler 3"
    | "Prep 1"
    | "Prep 2"
    | "Prep 3"
    | "Preschool 1"
    | "Preschool 2"
    | "Preschool 3"
    | "Pre-K 1"
    | "Pre-K 2"
    | ""
}

const employeeSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  preferredName: { type: String, required: true },
  role: { type: String, required: true, default: "employee" },
  roleId: { type: String, required: true, default: process.env.ROLE_BASIC_ID },
  classroom: { type: String, default: "" }
})

const Employee = mongoose.model<IEmployee_To>("Employee", employeeSchema)

export default Employee
