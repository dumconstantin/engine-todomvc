import { engine, producers } from "@c11/engine.runtime";
import { render } from "@c11/engine.react";
import { App } from "./views/App";
import { sendToDashboard } from "@c11/engine.dashboard"
import { TodoFilters } from "./types";
import { debug } from "@c11/engine.patterns"
import "./global";

const app = engine({
  // onEvents: sendToDashboard(),
  state: {
    filter: TodoFilters.all,
    clearRequest: null,
    toggleAllRequest: null,
    todosById: {
      todo1: { id: 'todo1', title: 'Add initial state to engine', status: "pending", mode: "viewing" },
      todo2: { id: 'todo2', title: 'Use initial state in components', status: "done", mode: "viewing" },
      todo3: { id: 'todo3', title: 'Update state in components', status: "done", mode: "editing" }
    },
    visibleTodoIds: ['todo1', 'todo2']
  },
  use: [
    render(<App />, "#app", {
      debug: process.env.NODE_ENV === "development",
      // debug: false,
    }),
    producers(debug)
  ]
});

app.start();

// Each renderer can have a state where it stores if it finished rendering/mounting/etc
// This can be used to hook-up processes for export for example
