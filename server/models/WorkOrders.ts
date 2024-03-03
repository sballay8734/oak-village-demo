import mongoose, { Schema } from "mongoose"

export interface IWorkOrder_To {
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
  areaInClassroom: string
  taskNeeded: string
  additionalDetails?: string
  employeeName: string
  employeeId: string
  status:
    | "Pending"
    | "Received"
    | "Documented"
    | "Awaiting Materials"
    | "In Progress"
    | "Completed"
    | "Could Not Complete"
  dateSubmitted: string
}

const workOrderSchema = new Schema({
  classroom: { type: String, required: true },
  areaInClassroom: { type: String, required: true },
  taskNeeded: { type: String, required: true },
  additionalDetails: { type: String },
  employeeName: { type: String, required: true },
  employeeId: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  dateSubmitted: {
    type: String,
    required: true,
    default: new Date().toISOString()
  }
})

const WorkOrder = mongoose.model<IWorkOrder_To>("WorkOrder", workOrderSchema)

export default WorkOrder
