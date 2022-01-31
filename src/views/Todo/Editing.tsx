import { TodoModes } from "../../types";

const Editing: view = ({
    id,
    title = observe.todosById[prop.id].title,
    updateTodoTitle = update.todosyById[prop.id].title,
    updateTodoMode = update.todosyById[prop.id].mode,
    updateFoo = update.foo
}) => (
    <li className="editing">
        <input
            className="edit"
            defaultValue={title}
            onChange={(e) => {
                // this does not work
                console.log("change edit input", id,  e.currentTarget.value)
                updateTodoTitle.set(e.currentTarget.value)
                updateFoo.set(e.currentTarget.value
                    )
            }
            }
            onBlur={() => {
                console.log("BLURRED")
                updateTodoMode.set(TodoModes.viewing)
            }
            }
        />
    </li>

);

export default Editing;