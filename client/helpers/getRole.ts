export function getRole(id: string) {
  if (id === process.env.EXPO_PUBLIC_ROLE_PAST_ID) {
    return "teacher"
  } else if (id === process.env.EXPO_PUBLIC_ROLE_JOHN_ID) {
    return "maintenance"
  } else if (id === process.env.EXPO_PUBLIC_ROLE_DAD_ID) {
    return "parent"
  } else if (id === process.env.EXPO_PUBLIC_ROLE_KING_ID) {
    return "admin"
  } else {
    return "login"
  }
}
