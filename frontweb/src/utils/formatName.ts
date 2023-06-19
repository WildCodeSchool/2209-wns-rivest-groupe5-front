export const formatAllUppercase = (word: string): string => {
  return word.toUpperCase()
}

export const formatFirstLetterUppercase = (word: string): string => {
  const firstletter = word.trim().slice(0, 1).toUpperCase()
  return firstletter + word.trim().slice(1).toLowerCase()
}

export const formatFullname = (firstname: string, lastname: string): string => {
  const fullname =
    formatAllUppercase(lastname) + ' ' + formatFirstLetterUppercase(firstname)
  return fullname
}
