export function isInvalidEmail(email) {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export function isInvalidPhoneNumber(phone) {
  return !/^\d{3}-\d{3}-\d{4}$/g.test(phone)
}
