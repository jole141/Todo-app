export type TodoItemDto = {
  title: string
}

export type UserInfoDto = {
  username: string
}

export type LoginResponse = {
  isValid: boolean,
  token: string,
}
