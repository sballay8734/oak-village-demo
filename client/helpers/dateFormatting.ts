export const getDateDifference = (dateString: string) => {
  const submittedDate = new Date(dateString)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - submittedDate.getTime()
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24))

  return daysDifference
}
