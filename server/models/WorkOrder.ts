import mongoose, { Schema } from "mongoose"

// Structure provided by user
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
}

// Final structure of object in database
interface IWorkOrderDocument extends IWorkOrder_To, Document {
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

// ARE WE SURE THE ISSUE ISN'T COMING FROM THIS LINE HERE?
const WorkOrder = mongoose.model<IWorkOrderDocument>(
  "WorkOrder",
  workOrderSchema
)

export default WorkOrder
