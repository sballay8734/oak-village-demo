// Work Order To Database
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

export interface CreateUserFormData {
  classroom: string
  areaInClassroom: string
  taskNeeded: string
  additionalDetails?: string
}

export interface StatusUpdateParams {
  workOrderId: string
  status: string
}
export interface SeenUpdateParams {
  workOrderId: string
  seenStatus: boolean
}
