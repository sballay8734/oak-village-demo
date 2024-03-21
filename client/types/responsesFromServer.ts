// * ERROR AND SUCCESS SHAPE ***************************************************
interface ErrorResponse {
  message: string
  statusCode: number
  success: false
  type: "formInput" | "requestResult"
}

interface SuccessResponse<T> {
  message: string
  payload: T
  success: true
}

export type ApiResponse<T> = { data: ErrorResponse | SuccessResponse<T> }

// * Modified Responses due to Redux-Toolkit modifying the response object

export interface ModErrorResponse {
  error: {
    data: ErrorResponse
    status: number
  }
}

interface ModSuccessResponse<T> {
  data: SuccessResponse<T>
}

export type ModApiResponse<T> = ModErrorResponse | { data: SuccessResponse<T> }

// * Work Order FROM Server SHAPE **********************************************
// work order TO Server is just formData
export interface WorkOrderFrom {
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
  seenByMaintenance: boolean
}

export interface ModifiedWorkOrderFrom {
  payload: WorkOrderFrom[] | []
}

// * AUTH Shapes
export interface CreatedUser {
  _id: string
  email: string
  firstName: string
  lastName: string
  preferredName: string
  roleId: string
}

export interface AuthenticatedUser {
  _id: string
  email: string
  firstName: string
  lastName: string
  preferredName: string
  roleId: string
  classroom: string
}
