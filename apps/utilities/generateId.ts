/* eslint-disable @typescript-eslint/space-before-function-paren */
export function generateUniqueId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let id = ''

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    id += characters.charAt(randomIndex)
  }

  return id
}
