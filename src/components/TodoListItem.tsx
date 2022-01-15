import React from "react";
import { Todo, ToggleComplete } from "../types";

interface IProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
}

export const TodoListItem: React.FC<IProps> = ({
  todo,
  toggleComplete
}) => {
  return (
    <li>
      <label className={todo.complete ? "complete" : undefined}>
        <input
          type="checkbox"
          onChange={() => toggleComplete(todo)}
          // onChange={toggleComplete} // This won't work here, because toggleComplete expects an argument => we pass arguments via callbacks
          checked={todo.complete}
        />
        {todo.text}
      </label>
    </li>
  );
};
