interface ErrorResponse {
  success: boolean
  statusCode: number
  message: string
}

interface SuccessResponse<T> {
  success: boolean
  statusCode: number
  message: string
  payload: T
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>

// Response from server/mongoDb
export interface WorkOrderCreateResponse {
  _id: string
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
  additionalDetails: string // NOT optional because it should be an empty str
  employeeName: string
  employeeId: string
  status: // also NOT optional anymore because DB will add default value
  | "Pending"
    | "Received"
    | "Documented"
    | "Awaiting Materials"
    | "In Progress"
    | "Completed"
    | "Could Not Complete"
  dateSubmitted: string // also NOT optional anymore because DB will add default value
}
