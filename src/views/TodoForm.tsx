import { TodoItem, TodoStatuses, TodoModes, NewTodoIntents } from "../types";

const addNewTodo: producer = ({
    newTodoIntent = observe.newTodo.intent,
    getTitle = get.newTodo.title,
    updateTodosById = update.todosById,
    updateNewTodoTitle = update.newTodo.title,
    updateNewTodoIntent = update.newTodo.intent
}) => {
    if (newTodoIntent !== NewTodoIntents.commit) {
        return;
    }
    updateNewTodoIntent.remove();
    const title = getTitle.value().trim();
    if (!title) return;
    const id = String(new Date().getTime());
    const newTodo: TodoItem = {
        id,
        title,
        status: TodoStatuses.pending,
        mode: TodoModes.viewing,
    };

    updateTodosById.merge({
        [id]: newTodo,
    });

    updateNewTodoTitle.set(null);

};

const cancelAddingTodo: producer = ({
    newTodoIntent = observe.newTodo.intent,
    updateNewTodoTitle = update.newTodo.title,
    updateNewTodoIntent = update.newTodo.intent
}) => {
    if (newTodoIntent !== NewTodoIntents.discard) {
        return;
    }
    updateNewTodoIntent.remove();
    updateNewTodoTitle.set(null);
};

const TodoForm: view = ({
    newTodoTitle = observe.newTodo.title,
    updateNewTodoTitle = update.newTodo.title,
    updateNewTodoIntent = update.newTodo.intent
}) => {

    return (<input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={newTodoTitle || ""}
        onChange={(e) => updateNewTodoTitle.set(e.currentTarget.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                updateNewTodoIntent.set(NewTodoIntents.commit);
            }
            if (e.key === "Escape") {
                updateNewTodoIntent.set(NewTodoIntents.discard);
            }
        }}

    />);
};

TodoForm.producers([
    addNewTodo,
    cancelAddingTodo
]);

export default TodoForm;