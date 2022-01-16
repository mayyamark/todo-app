import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import React from "react";
import useHooks from "../hooks/useHooks";
import { AddTodoForm } from "./AddTodoForm";
import ErrorPage from "./ErrorPage";
import { TodoList } from "./TodoList";

const Home: React.FC = () => {
  const { useGetAllTodosQuery, useAddTodoMutation, useToggleCompleteMutation } = useHooks();

  const { data: todos, loading, error } = useGetAllTodosQuery();

  const [addTodo, { 
    loading: isAddTodoLoading, 
    error: isAddTodoError 
  }] = useAddTodoMutation();

  const [toggleComplete, { 
    loading: isToggleLoading, 
    error: isToggleError 
  }] = useToggleCompleteMutation();

  if (error || isAddTodoError || isToggleError) {
    return <ErrorPage />;
  }

  console.log({
    query: { todos, loading, error}, 
    add: { loading: isAddTodoLoading, error:isAddTodoError }, 
    toggle: { loading: isToggleLoading, error:isToggleError }
  });
  
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column",
        margin: 6 // 48px
      }}
    >
      <AddTodoForm 
        isDisabled={loading || isAddTodoLoading || isToggleLoading} 
        addTodo={addTodo} 
      />
      {(loading || isAddTodoLoading) && (
        <CircularProgress 
          size={80} 
          sx={{ 
            alignSelf: "center", 
            marginBottom: 2 
          }} 
        />)}
      {todos && <TodoList todos={todos} toggleComplete={toggleComplete} />}
    </Box>
  );
};

export default Home;
