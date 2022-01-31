export enum TodoStatuses {
  pending = "pending",
  done = "done",
}

export interface TodoItem {
  id: string;
  title: string;
  status: TodoStatuses;
  mode: TodoModes;
}

export type TodosById = { [id: string]: TodoItem }; // hashmapped

export enum TodoModes {
  viewing = "viewing",
  editing = "editing",
}

export interface NewTodo {
  title: string;
  intent: NewTodoIntents;
}

export enum NewTodoIntents {
  commit = "commit",
  discard = "discard",
}
export enum TodoFilters {
  all = "all",
  completed = "completed",
  pending = "pending",
}