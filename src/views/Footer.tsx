
import { TodoStatuses, TodosById, TodoFilters } from "../types";


const Footer: view = ({
    pendingCount = observe.pendingCount,
    filter = observe.filter,
    updateFilter = update.filter,
    updateClearRequest = update.clearRequest
}) => (
    <footer className="footer">
        <span className="todo-count">
            <strong>{pendingCount}</strong> items left
        </span>
        <ul className="filters">
            <li>
                <a href="#/"
                    className={filter === TodoFilters.all ? "selected" : ""}
                    onClick={() => updateFilter.set(TodoFilters.all)}
                >
                    All
                </a>
            </li>
            <li>
                <a href="#/active"
                    className={filter === TodoFilters.pending ? "selected" : ""}
                    onClick={() => updateFilter.set(TodoFilters.pending)}
                >Active</a>
            </li>
            <li>
                <a href="#/completed"
                    className={filter === TodoFilters.completed ? "selected" : ""}
                    onClick={() => updateFilter.set(TodoFilters.completed)}
                >Completed</a>
            </li>
        </ul>
        <button
            className="clear-completed"
            onClick={() => updateClearRequest.set(new Date().getTime())}
        >
            Clear completed
        </button>
    </footer>
);

const pendingCounter: producer = ({
    updatePendingCount = update.pendingCount,
    todosById = observe.todosById
}) => {
    const pendingCount = Object.values(
        todosById as TodosById
    ).reduce(
        (accum: number, todo) =>
            todo.status === TodoStatuses.done ? accum : accum + 1,
        0
    );
    updatePendingCount.set(pendingCount);
};

const handleClearRequest: producer = ({
    clearRequest = observe.clearRequest,
    updateClearRequest = update.clearRequest,
    getTodosById = get.todosById,
    updateTodosById = update.todosById,
}) => {
    if (!clearRequest) {
        return;
    }

    const todosById = getTodosById.value();
    const nextTodos = Object.values(todosById)
        .filter((todo: any) => todo.status !== TodoStatuses.done)
        .reduce((accum: any, todo: any) => {
            accum[todo.id] = todo;

            return accum;
        }, {});

    updateTodosById.set(nextTodos);
    updateClearRequest.set(null);
};


Footer.producers([pendingCounter, handleClearRequest]);

export default Footer;
