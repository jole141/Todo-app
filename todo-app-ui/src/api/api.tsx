import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  TodoItemEditRequest,
  TodoItemRequest,
  TodoItemResponse,
  UserInfoResponse,
} from "./types";
import { apiEndpoints } from "./path";

export async function signUp(req: SignUpRequest): Promise<void> {
  await fetch(apiEndpoints.signUp, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(apiEndpoints.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  return response.json();
}

export async function getCurrentUser(): Promise<UserInfoResponse> {
  const response = await fetch(apiEndpoints.getCurrentUser, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function addTodoItem(req: TodoItemRequest): Promise<void> {
  await fetch(apiEndpoints.todoItems, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}

export async function editTodoItem(req: TodoItemEditRequest): Promise<void> {
  await fetch(`${apiEndpoints.todoItems}/${req.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}

export async function checkTodoItem(id: string): Promise<void> {
  await fetch(`${apiEndpoints.todoItems}/check/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function getTodoItems(): Promise<TodoItemResponse[]> {
  const response = await fetch(apiEndpoints.todoItems, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deleteTodoItem(id: string): Promise<void> {
  await fetch(`${apiEndpoints.todoItems}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
