import mongoose, { Schema } from "mongoose"

// TODO: Add status, seenByMaintenance
export interface IWorkOrder_To {
  classroom: string
  areaInClassroom: string
  taskNeeded: string
  additionalDetails?: string
  teacherName: string
  teacherId: string
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
  teacherName: { type: String, required: true },
  teacherId: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  dateSubmitted: {
    type: String,
    required: true,
    default: new Date().toISOString()
  }
})

const WorkOrder = mongoose.model<IWorkOrder_To>("WorkOrder", workOrderSchema)

export default WorkOrder
