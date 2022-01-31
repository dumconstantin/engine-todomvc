import { TodoStatuses, TodoModes } from "../../types";

const Viewing: view = ({
  title = observe.todosById[prop.id].title,
  status = observe.todosById[prop.id].status,
  updateTodo = update.todosById[prop.id].mode

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
      <label
        onDoubleClick={() => updateTodo.set(TodoModes.editing)}

      >{title}</label>
      <button className="destroy" />
    </div>
  </li>
);

export default Viewing;