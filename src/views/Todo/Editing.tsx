import { TodoModes } from "../../types";

const Editing: view = ({
    title = observe.todosById[prop.id].title,
    updateTodo = update.todosById[prop.id]
}) => (
    <li className="editing">
        <input
            className="edit"
            defaultValue={title}
            onChange={(e) => updateTodo.merge({ title: e.currentTarget.value })}
            onBlur={() => updateTodo.merge({ mode: TodoModes.viewing })}
        />
    </li>

);

export default Editing;