export type SignUpRequest = {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
};

export type LoginRequest = {
  email: string | undefined;
  password: string | undefined;
};

export type TodoItemRequest = {
  title: string;
};

export type TodoItemEditRequest = {
  id: string;
  title: string;
};

export type LoginResponse = {
  isValid: boolean;
  token: string;
};

export type UserInfoResponse = {
  username: string;
};

export type TodoItemResponse = {
  id: string;
  title: string;
  isDone: boolean;
  dom: string;
};
