import Viewing from "./Viewing";
import Editing from "./Editing";
import { TodoModes } from "../../types";

// render component conditionally

const uiStates = {
    [TodoModes.editing]: Editing,
    [TodoModes.viewing]: Viewing
};

const Fallback = ({ id }: { id: string }) => {
    console.warn("Invalid UI State for Todo with Id", id);
    return null;
};

const Todo: view = ({ id, mode = observe.todosById[prop.id].mode }) => {
    const Component = uiStates[mode as TodoModes] || Fallback;
    return <Component id={id} />;
};

export default Todo;