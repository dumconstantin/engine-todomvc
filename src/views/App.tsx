import Todo from "./Todo";
import TodoForm from "./TodoForm"
import Footer from "./Footer";

import { TodoStatuses, TodoFilters, TodoItem, TodosById } from "../types";

import "todomvc-app-css/index.css";


// PRODUCERS

const syncVisibleTodoIds: producer = ({
  todosById = observe.todosById,
  filter = observe.filter,
  visibleTodoIds = update.visibleTodoIds,
}) => {
  const todoIdsToDisplay = Object.entries(todosById as TodosById)
    .map(([key, value]) => {
      switch (filter as TodoFilters) {
        case TodoFilters.completed:
          return value.status === TodoStatuses.done ? key : null;
        case TodoFilters.pending:
          return value.status === TodoStatuses.done ? null : key;
        default:
          return key;
      }
    })
    .filter(Boolean);

  visibleTodoIds.set(todoIdsToDisplay);
};

const handleToggleAllRequest: producer = ({
  toggleAllRequest = observe.toggleAllRequest,
  updateToggleAllRequest = update.toggleAllRequest,
  getTodosById = get.todosById,
  getPendingCount = get.pendingCount,
  updateTodosById = update.todosById,
}) => {
  if (!toggleAllRequest) {
    return;
  }

  const todosById = getTodosById.value() as TodosById;
  const pendingCount = getPendingCount.value();

  const nextTodos = Object.values(todosById)
    .map((todo) => {
      return {
        ...todo,
        status: pendingCount !== 0 ? TodoStatuses.done : TodoStatuses.pending,
      };
    })
    .reduce((accum, todo) => {
      accum[todo.id] = todo;

      return accum;
    }, {} as TodosById);

  updateTodosById.set(nextTodos);
  updateToggleAllRequest.set(null);
};

// VIEW

export const App: view = ({
  todoIds = observe.visibleTodoIds,
  pendingCount = observe.pendingCount,
  updateToggleAllRequest = update.toggleAllRequest
}) => (
  <div>
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
        </header>
        <TodoForm />
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox"
            checked={pendingCount === 0}
            onChange={() =>
              updateToggleAllRequest.set(new Date().getTime())
            }
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todoIds.map((id: string) => (
              <Todo key={id} id={id} />
            ))}
          </ul>
        </section>
        <Footer />
      </div>
    </section>

  </div>
);

App.producers([syncVisibleTodoIds, handleToggleAllRequest]);
