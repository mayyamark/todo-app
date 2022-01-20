import React from "react";
import { Todo, ToggleComplete } from "../types";
import { TodoListItem } from "./TodoListItem";

interface IProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
}

export const TodoList: React.FC<IProps> = ({
  todos,
  toggleComplete
}) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};
