import { TodoStatuses, TodoModes, TodosById, TodoItem } from "../../types";

const removeTodo: producer = ({
  todoToRemove = observe.todoToRemove,
  updateRemoveTodo = update.todosById[arg.todoToRemove],
  updateTodoToRemove = update.todoToRemove
}) => {
  if (!todoToRemove) {
    return;
  }
  updateRemoveTodo.remove();
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