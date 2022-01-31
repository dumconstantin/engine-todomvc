import { TodoItem, NewTodo, TodoFilters } from "./types";

export type State = {
  name: string;
  greeting: string;
  item: {
    [k: string]: string;
  };
  todosById: Record<string, TodoItem>;
  visibleTodoIds: Array<string>;
  newTodo: NewTodo;
  filter: TodoFilters;
  pendingCount: number;
  clearRequest: number | null;
  toggleAllRequest: number | null;
  todoToRemove: string | null;
};
