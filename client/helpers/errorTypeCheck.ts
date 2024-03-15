import {
  ModApiResponse,
  AuthenticatedUser,
  ModErrorResponse
} from "../types/responsesFromServer"

export function isModErrorResponse(
  res: ModApiResponse<AuthenticatedUser>
): res is ModErrorResponse {
  return "error" in res
}
