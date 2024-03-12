export interface Err extends Error {
  statusCode: number
  type: string
}
