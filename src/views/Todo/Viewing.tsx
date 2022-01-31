import { TodoStatuses, TodoModes, TodosById, TodoItem } from "../../types";

const removeTodo: producer = ({
  todoToRemove = observe.todoToRemove,
  getTodosById = get.todosById,
  updateTodosById = update.todosById,
  updateTodoToRemove = update.todoToRemove
}) => {
  if (!todoToRemove) {
    return;
  }
  const currentTodos: TodosById = getTodosById.value()
  const newTodos: TodosById = Object.values(currentTodos as TodosById)
    .filter((todo: TodoItem) => todo.id !== todoToRemove)
    .reduce((accum, todo) => {
      accum[todo.id] = todo;
      return accum;
    }, {} as TodosById)

  updateTodosById.set(newTodos);
  updateTodoToRemove.set(null);
};

const Viewing: view = ({
  id,
  title = observe.todosById[prop.id].title,
  status = observe.todosById[prop.id].status,
  updateTodo = update.todosById[prop.id],
  updateTodoToRemove = update.todoToRemove
}) => (
  <li className={status === 'done' ? "completed" : ""}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={status === TodoStatuses.done}
        onChange={() =>
          updateTodo.merge({
            status:
              status === TodoStatuses.done
                ? TodoStatuses.pending
                : TodoStatuses.done
          })}
      />
      <label onDoubleClick={() => updateTodo.merge({ mode: TodoModes.editing })}>{title}</label>
      <button className="destroy" onClick={() => updateTodoToRemove.set(id)} />
    </div>
  </li>
);

Viewing.producers([removeTodo]);
export default Viewing;