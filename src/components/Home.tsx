import Box from "@mui/material/Box";
import React, { useState } from "react";
import { initialTodos } from "../initialTodos";
import { AddTodo, Todo, ToggleComplete } from "../types";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>(initialTodos);

  const toggleComplete: ToggleComplete = (selectedTodo: Todo) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === selectedTodo.id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const addTodo: AddTodo = (newTodoText: string) => {
    if (newTodoText.trim() !== "") {
      const newTodo = { 
        id: todos.length + 1, 
        text: newTodoText, 
        complete: false 
      };

      setTodos([newTodo].concat(todos)); // will add it at the beggining of the list
    }
      // On a single line:
      // newTodoText.trim() !== "" && setTodos([...todos, { id: todos.length + 1, text: newTodoText, complete: false }]); // will add it at the end of the list
  };

  return (
    <Box sx={{ 
        margin: 6 // 6 * 8 = 48px
      }}
    >
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} />
    </Box>
  );
};

export default Home;
