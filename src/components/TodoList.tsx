import List from "@mui/material/List";
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
  console.log(todos)
  return (
    <List sx={{
      border: '2px solid',
      borderColor: 'primary.main',
      borderRadius: 1, // 4px
      padding: 2, // 16px
    }}>
      {todos.map(todo => (
        <TodoListItem
          key={todo.text}
          todo={todo}
          toggleComplete={toggleComplete}
        />
      ))}
    </List>
  );
};
